import { rejects } from "assert";
import axios, { AxiosError } from "axios";
import { Router } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContexts";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError<unknown, any>) => void;
}[] = [];

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});
//interceptors to catch token expirations
//backend interception response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === "token.expired") {
        cookies = parseCookies();

        const { "nextauth.refreshToken": refreshToken } = cookies;
        const originalConfig = error.config;

        if (!refreshToken) {
          isRefreshing = true;

          api
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, "nextAuth.token", token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: "/",
              });

              setCookie(
                undefined,
                "nextAuth.refreshToken",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  path: "/",
                }
              );

              api.defaults.headers["Authorization"] = `Bearer${token}`;

              failedRequestsQueue.forEach((request) => request.resolve(token));
              failedRequestsQueue = [];
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.reject(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            reject: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        //deslogar o usuario
        signOut();
      }
    }
    return Promise.reject(error);
  });
