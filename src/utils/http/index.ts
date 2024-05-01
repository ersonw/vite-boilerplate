import {AxiosError, AxiosHeaders, AxiosInstance, AxiosPromise, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import { Interceptors } from './request';
import { Method, RawAxiosRequestHeaders } from 'axios';

export interface RequestConfigType {
    url: string;
    method?: Method | string;
    headers?: RawAxiosRequestHeaders | AxiosHeaders;
    params?: unknown;
    data?: unknown;
    duplicateRequestValidation?: boolean;
    duplicateRequestValidationTime?: number;
}
// export interface AxiosError {
//     code: number,
//     msg?: string;
// }
// 请求配置
export class HttpServer {
    axios: AxiosInstance;
    // 初始化对象 获取axios实例
    constructor() {
        this.axios = new Interceptors().getInterceptors();
    }
    // 简单封装一下方法
    request<T>(config: RequestConfigType): Promise<T> {
        return new Promise((resolve, reject) => {
            this.axios<T>(config as InternalAxiosRequestConfig)
                .then((res) => {
                    resolve(res as T);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }

    post(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios
                .post(config.url, config.data, config as InternalAxiosRequestConfig)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }

    get(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios
                .get(config.url, config as InternalAxiosRequestConfig)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }

    delete(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios
                .delete(config.url, config as InternalAxiosRequestConfig)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }

    put(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios
                .put(config.url, config.data, config as InternalAxiosRequestConfig)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }

    patch(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios
                .patch(config.url, config.data, config)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err as AxiosError);
                });
        });
    }
}

const http = new HttpServer();

export default http;

// import CryptoJS  from "crypto-js";
// const verifyTelegramWebAppData = async (telegramInitData: string): Promise<boolean> => {
//     const initData = new URLSearchParams(telegramInitData);
//     const hash = initData.get("hash");
//     const dataToCheck: string[] = [];
//
//     initData.sort();
//     initData.forEach((val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`));
//     const secret = CryptoJS.HmacSHA256("", "WebAppData");
//     const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(CryptoJS.enc.Hex);
//     console.log(dataToCheck.join("\n"));
//     return _hash === hash;
// }
