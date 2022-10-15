import { useContext, useEffect } from "react";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthContext } from "../contexts/AuthContexts";
import { useCan } from "../hooks/useCan";
import Can from "../components/Can";
import { withSSRAuth } from "../utils/withSSRauth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ["metrics.list"],
  });

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard {user?.email}</h1>
      <button onClick={signOut}>Sign Out Out</button>
      <Can permissions={["metrics.list"]}>
        <div>Metricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");


  return {
    props: {},
  };
});
