import { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import Router from "next/router";

type User={
 email:string
 permissions:string[]
 roles:string[]
}

type SignIncredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignIncredentials): Promise<void>;
  isAuthenticated: boolean;
};
type Props = {
  children: ReactNode;
};

//creating context
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: Props) {
const [use,setUser] = useState<User>()

  const isAuthenticated = false;

  async function signIn({ email, password }: SignIncredentials) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const{permissions,roles} = response.data

      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/Dashboards')

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
