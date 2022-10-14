import Router from "next/router";
import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { withSSRauth } from "../utils/withSSRauth";

function handleBackHome() {
  return Router.push("/");
}

export default function Dashboards() {
  useEffect(() => {
    api
      .get("/me")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Hello mr {user?.email}</h1>
      <button onClick={handleBackHome}> home</button>
    </>
  );
}

export const getServerSideProps = withSSRauth<{}>(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");

  console.log(response);

  return {
    props: {},
  };
});
