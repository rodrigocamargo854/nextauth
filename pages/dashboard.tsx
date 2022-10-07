import Router from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";

export default function Dashboard() {
const {user} = useContext(AuthContext)

  function handleBackHome(){
    return Router.push('/')
  }

  return (
    <>
      <h1>bom dia {user.email}</h1>
      <button onClick={handleBackHome}>voltar</button>;
    </>
  );
}
