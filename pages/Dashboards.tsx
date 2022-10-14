import { useContext, useEffect } from "react";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRauth } from "../utils/withSSRauth";
import { AuthContext } from "../contexts/AuthContexts";
import { useCan } from "../hooks/useCan";
import Can from "../components/Can";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

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
      <Can permissions={["metrics.list"]}>
        <div>Metricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRauth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response);

  return {
    props: {},
  };
});
