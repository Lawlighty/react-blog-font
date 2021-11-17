import axios from "axios";
import { message } from "antd";
import { reLogin } from "@/utils/utils";

//  axios.defaults.baseURL = 'http://172.20.16.15:8070';
export const BASE_UPLOAD_IMG_URL = "http://47.96.105.70:3009/upload";
axios.defaults.baseURL = "http://47.96.105.70:3009";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.timeout = 10000;
export const MethodType = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

/**
 * 模块说明:有api_token的请求
 */
export const request = (url, method, params) => {
  switch (method) {
    case MethodType.GET:
      return axios
        .get(url, {
          params,
          headers: {
            Authorization: "Bearer " + localStorage.token,
            // token: localStorage.token,
            // 'X-AUTH-TOKEN': localStorage.token,
            // 'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            reLogin();
          }
        });
    case MethodType.POST:
      return axios
        .post(url, params, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
            // 'X-AUTH-TOKEN': localStorage.token,
            // 'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            reLogin();
          }
        });
    case MethodType.PUT:
      return axios
        .put(url, params, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
            // 'X-AUTH-TOKEN': localStorage.token,
            // 'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            reLogin();
          }
        });
    case MethodType.DELETE:
      return axios
        .delete(url, {
          params,
          headers: {
            Authorization: "Bearer " + localStorage.token,
            // 'X-AUTH-TOKEN': localStorage.token,
            // 'Content-Type': 'application/json;charset=utf-8',
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            reLogin();
          }
        });
    default:
      return axios.get(url, { params }).catch((error) => {
        if (error.response.status === 401) {
          reLogin();
        }
      });
  }
};
export const request2 = (api, method, params = {}, config = {}) => {
  console.log("api==>", api);
  console.log("method==>", method);
  console.log("method typeof==>", typeof method);
  console.log("params==>", params);
  console.log("method 对比", method == "GET");
  const apiToken = localStorage.token;
  let data = "data";
  if (method == "GET") {
    data = "params";
  }
  console.log("data==>", data);
  let headers = {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-Type': 'application/json',
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${apiToken}`,
  };
  if (config.headers) {
    headers = {
      ...headers,
      ...config.headers,
    };
  }
  return new Promise((resolve, reject) => {
    axios({
      url: api,
      method: method,
      [data]: params,
      headers,
    })
      .then(resolve)
      .catch((error) => {
        // console.log('error', error);
        // console.log('error type', typeof error);
        // console.log('error keys', Object.keys(error));
        // console.log('error config', error['config']);
        // console.log('error request', error['request']);
        // console.log('error response', error['response']);
        // console.log('error isAxiosError', error['isAxiosError']);
        // console.log('error toJSON', error['toJSON']);
        if (error.response.status === 401) {
          reLogin();
        }
      });
  });
};
