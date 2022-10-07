import { createContext, ReactNode } from "react";

type SignIncredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignIncredentials): Promise<void>;
  isAuthenticated: boolean;
};
type Props={
children: ReactNode
}

//creating context
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }:Props) {
    const isAuthenticated=false
    async function signIn({email,password}:SignIncredentials){
        console.log({email,password})
    }


  return <AuthContext.Provider value={{signIn,isAuthenticated}}>{children}</AuthContext.Provider>;
}
