import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";

export function withSSRauth<P extends { [key: string]: unknown }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    console.log(ctx.req.cookies);

    if (cookies["nextauth.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return await fn(ctx);
  };
}
