import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignIncredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignIncredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};
type Props = {
  children: ReactNode;
};

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  Router.push("/");
}
//creating context
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies(); // bring all saves cookies
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, pemissions, roles } = response.data;

          setUser({
            email,
            pemissions,
            roles,
          });
        })
        .catch((error) => {
          signOut()
        });
    }
  }, []);

  async function signIn({ email, password }: SignIncredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "nextAuth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      setCookie(undefined, "nextAuth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      //before redirect to dashboard , doing the authorization
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/Dashboards");

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
