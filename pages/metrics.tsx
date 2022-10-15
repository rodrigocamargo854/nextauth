import { setupAPIClient } from "../services/api";
import { withSSRauth } from "../utils/withSSRAuth";

export default function Metrics() {
  return (
    <>
      <h1>Metrics </h1>
    </>
  );
}

export const getServerSideProps = withSSRauth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);
