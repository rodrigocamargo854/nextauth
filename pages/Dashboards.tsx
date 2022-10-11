import Router from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { api } from "../services/api";
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
  return {
    props: {},
  };
});
