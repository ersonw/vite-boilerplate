import { AxiosHeaders, AxiosPromise, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Interceptors } from './request';
import { Method, RawAxiosRequestHeaders } from 'axios';

interface RequestConfigType {
    url?: string;
    method?: Method | string;
    headers?: RawAxiosRequestHeaders | AxiosHeaders;
    params?: any;
    data?: any;
    duplicateRequestValidation?: boolean;
    duplicateRequestValidationTime?: number;
}

// 请求配置
export class HttpServer {
    axios: any;
    // 初始化对象 获取axios实例
    constructor() {
        this.axios = new Interceptors().getInterceptors();
    }
    // 简单封装一下方法
    request(config: RequestConfigType): AxiosPromise {
        return new Promise((resolve, reject) => {
            this.axios(config as InternalAxiosRequestConfig)
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((err: any) => {
                    reject(err);
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
                .catch((err: any) => {
                    reject(err);
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
                .catch((err: any) => {
                    reject(err);
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
                .catch((err: any) => {
                    reject(err);
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
                .catch((err: any) => {
                    reject(err);
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
                .catch((err: any) => {
                    reject(err);
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
