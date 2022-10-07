import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";

//informations returnesd from backend from payload
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
  user:User
  isAuthenticated: boolean;
};

type Props = {
  children: ReactNode;
};

//creating context
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignIncredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });
      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated,user }}>
      {children}
    </AuthContext.Provider>
  );
}
