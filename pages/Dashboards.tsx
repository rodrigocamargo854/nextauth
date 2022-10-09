import Router from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { api } from "../services/api";

function handleBackHome() {
  return Router.push("/");
}

export default function Dashboards() {
  useEffect(() => {
    api.get("/me").then((response) => {
      console.log(response);
    });
  }, []);
  
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Hello mr {user?.email}</h1>
      <button onClick={handleBackHome}> home</button>
    </>
  );
}
