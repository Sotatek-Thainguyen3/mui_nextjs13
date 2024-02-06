import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseHeaders,
  Method,
} from "axios";
import { getAuthorizationHeader } from "./authorization";
import { sleep } from "@/utils/util";
import qs from "qs";
import { _clearAuth } from "@/state/app/reducer";
import {
  ACCESS_TOKEN_KEY,
  AN_ERROR_TRY_AGAIN,
  REFRESH_TOKEN_KEY,
  SIGNIN_PATH,
} from "@/constants";
import { clientStorage } from "@/utils/storage";
import { HttpStatusCode } from "@/constants/enums";
import { AUTH_ENDPOINT, ENDPOINT } from "@/constants/endpoint";

const requestAbortCode = "ECONNABORTED";

function downloadAttachment(response: AxiosResponse, attachment: string) {
  const [, filename] = attachment.split("=");
  const fileLink = document.createElement("a");

  fileLink.href = window.URL.createObjectURL(new Blob([response.data]));
  fileLink.setAttribute("download", decodeURIComponent(filename));

  document.body.appendChild(fileLink);
  fileLink.click();

  document.body.removeChild(fileLink);
}

function getAttachment(responseHeaders: AxiosResponseHeaders) {
  const contentDisposition =
    responseHeaders && responseHeaders["content-disposition"];
  if (!contentDisposition) {
    return null;
  }

  const [matchedAttachedFile] = contentDisposition
    .split(";")
    .filter((str: string) => str.includes("filename"));
  return matchedAttachedFile;
}

export const setupAxios = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true, //chỉ set khi sử dụng cookie là nơi lưu trữ thông tin.
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
    paramsSerializer(params) {
      return qs.stringify(params, {
        arrayFormat: "comma",
        skipNulls: true,
        allowDots: true,
        filter: (prefix: any, value: any) =>
          value !== undefined && value !== null && value !== ""
            ? value
            : undefined,
      });
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const authorization = getAuthorizationHeader();
      if (authorization) {
        config.headers = {
          ...config.headers,
          authorization,
        } as unknown as AxiosRequestHeaders;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response) => {
      await sleep(2000);
      return response;
    },
    async (error) => {
      const config = error?.config;
      if (!error?.response) {
        return Promise.reject({
          message: "uncaught error",
          error: AN_ERROR_TRY_AGAIN,
        });
      }
      if (
        error.response &&
        error.response.status === HttpStatusCode.UNAUTHORIZED
        // error.response.data.code === "ACTION_NOT_ALLOWED"
      ) {
        const refreshToken = clientStorage.get(REFRESH_TOKEN_KEY);
        const isLogin = config.url === ENDPOINT.SIGNIN;
        const url = config?.url || "";
        console.log(error);
        if (
          ((!refreshToken && config.headers.token) ||
            config.headers["refresh-token"]) &&
          !isLogin
        ) {
          signOut();
        } else if (refreshToken) {
          try {
            const rTResponse = await axios.post(
              ENDPOINT.REFRESH_TOKEN,
              {},
              {
                // baseURL: AUTH_API_URL,
                headers: { "refresh-token": refreshToken },
              }
            );
            if (rTResponse?.status === HttpStatusCode.OK) {
              clientStorage.set(ACCESS_TOKEN_KEY, rTResponse.data.accessToken);
              clientStorage.set(
                REFRESH_TOKEN_KEY,
                rTResponse.data.refreshToken
              );
            }
            error.config.headers = {
              token: rTResponse.data.accessToken,
            };
            return axios(error.config);
          } catch (error) {
            signOut();
          }
        } else if (!AUTH_ENDPOINT.includes(url)) {
          signOut();
        }
      }
      if (
        (error as AxiosError)?.config &&
        ((error.code === requestAbortCode &&
          (error as AxiosError)?.response?.status ===
            HttpStatusCode.TOO_MANY_REQUEST) ||
          ("response" in error && error.response === undefined))
      ) {
        sleep(1000);
        axios.request((error as AxiosError).config as AxiosRequestConfig<any>);
      }
      return Promise.reject(error);
    }
  );

  const fetch = async <T>({
    method,
    url,
    options,
  }: {
    method: Method;
    url: string;
    options?: AxiosRequestConfig;
  }) => {
    const response = (await instance({
      method,
      url,
      ...options,
      headers: { Authorization: getAuthorizationHeader() },
    })) as AxiosResponse<T>;

    return response;
  };

  const apiClient = {
    get: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "get",
        url,
        options: {
          ...options,
          params,
        },
      }),
    post: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "post",
        url,
        options: {
          ...options,
          data,
        },
      }),
    patch: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "patch",
        url,
        options: {
          ...options,
          data,
        },
      }),
    put: <T>(url: string, data: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "put",
        url,
        options: {
          ...options,
          data,
        },
      }),
    delete: <T>(url: string, params?: any, options?: AxiosRequestConfig) =>
      fetch<T>({
        method: "delete",
        url,
        options: {
          ...options,
          params,
        },
      }),
  };

  return { apiClient };
};

export const { apiClient } = setupAxios();

const signOut = () => {
  clientStorage?.remove(ACCESS_TOKEN_KEY);
  window.location.href = SIGNIN_PATH;
};
