import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    Canceler,
    InternalAxiosRequestConfig,
} from 'axios';
import { errorCodeType } from './error-code-type';
// import WebApp from "@twa-dev/sdk";

export class Interceptors {
    requestQueue: {
        createTime: number;
        url: string;
        method: string;
        cancel: Canceler;
    }[] = [];
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            // 你的api地址 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 这里的话我的baseURL是存放在项目环境变量文件中
            // vite获取env环境变量的方式是import.meta.env
            baseURL: import.meta.env.VITE_APP_BASE_API,
            // 请求超时的毫秒数(0 表示无超时时间)
            timeout: 1000,
        });
        this.init();
    }
    init() {
        // 添加请求拦截器
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // 在这里的话你就可以去设置自己的请求头
                // 比如用户登录以后就能拿到一个token 这个token比如格式是data: {token: '*****'}
                // if (data.token) {
                //     config.headers['Authorization'] = `Bearer ${data.token}`
                //     config.headers['X-Access-Token'] = data.token
                // }

                // 防止一个接口在没有响应之前进行重新提交即重复提交验证，默认不校验 duplicateRequestValidation为true时开启
                if (config.url && config.duplicateRequestValidation) {
                    this.removeRequestQueue(config);
                    this.addRequestQueue(config);
                }
                // config.withCredentials = true;
                config.headers['auth'] = import.meta.env.VITE_APP_HEAD
                return config;
            },
            (error) => {
                // 对请求错误做些什么 直接抛出错误
                Promise.reject(error);
            }
        );
        // 添加响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 在这里的话你就可以去处理你响应成功的自定义逻辑

                // 根据后端返回的code值。比如约定的是20000代表登录过期
                // const res: any = response.data // 获取响应值
                // if (res.code === 20000) {
                //     // 清楚token 跳转登录页面
                // }

                // 比如10000表示请求成功，约定40000~50000不做拦截
                // const filterCode = Math.abs(parseInt(res.code)) >= 40000 && Math.abs(parseInt(res.code)) < 50000
                // if (res.code !== 10000 && !filterCode) {
                //     // 这里去处理请求失败的逻辑
                // } else {
                //     return response.data
                // }
                this.removeRequestQueue(response.config);
                const {code,msg,data} = response.data;
                // console.log({code,msg,data});
                if (code === 0){
                    return data;
                }
                const message: {msg: string,code: number} = {msg, code};
                if (msg){
                    message.msg = msg;
                    // WebApp.showAlert(msg);
                }
                if (code){
                    message.code = code;
                }
                return Promise.reject((code || msg) ? message : new Error('网络异常，请稍后~'));
            },
            (error: AxiosError) => {
                // 对响应错误做点什么
                // 一般响应错误后端都会返回一个错误码和错误信息比如404 401等等
                // 为了让用户更能直观的知道是什么原因  你可以把常见的错误做一个转换然后提示一下 404就是访问资源不存在,401就是没有权限等等
                // 我演示的接口使用的是http://www.7timer.info/全球天气预测系统的接口

                // 判断重复提交
                // 转换错误编码为文字 进行提示让客户有更好的体验 超时要进行一个单独的处理
                let message: string = error.message;
                if (message.includes('Duplicate request')) {
                    // console.log('👉👉👉-----------------禁止重复提交', message);
                    return Promise.reject(error);
                } else if (message.includes('timeout of')) {
                    message = '系统接口请求超时';
                    this.removeOverTimeRequest();
                } else if (error.response?.status) {
                    message = errorCodeType(error.response?.status);
                }
                // WebApp.showAlert(message);
                console.log('👉👉👉-----------------', message);
                return Promise.reject(error);
            }
        );
    }
    private addRequestQueue(config: InternalAxiosRequestConfig) {
        // 如果是初次的话就直接push
        if (this.requestQueue.length === 0) {
            config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
                this.requestQueue.push({
                    url: config.url!,
                    method: config.method!,
                    cancel,
                    createTime: Date.now(),
                });
            });
        } else {
            // 这里做循环处理，如果正在请求中存在路径一样方法一样的情况，就直接取消请求
            // 这里也可以根据自己的需求去扩展  比如参数不一样的话就通过等等
            for (const [index, p] of Object.entries(this.requestQueue)) {
                if (p.url === config.url && p.method === config.method) {
                    config.cancelToken = new axios.CancelToken((cancel: Canceler) => {
                        cancel('Duplicate request:'+index);
                    });
                }
            }
        }
    }
    private removeRequestQueue(target: InternalAxiosRequestConfig) {
        for (const [index, p] of Object.entries(this.requestQueue)) {
            // 只有在指定的时间到了以后才会取消控制  继续请求 否则终止
            if (
                p.url === target.url &&
                p.method === target.method &&
                p.createTime &&
                Date.now() - p.createTime > (target.duplicateRequestValidationTime || 0)
            ) {
                p.cancel('Duplicate request');
                this.requestQueue.splice(Number(index), 1);
            }
        }
    }
    private removeOverTimeRequest() {
        const nowDate = Date.now();
        for (const p in this.requestQueue) {
            const { createTime } = this.requestQueue[p];
            const time = nowDate - createTime;
            if (time >= 10000) {
                this.requestQueue.splice(Number(p), 1);
            }
        }
    }
    // 返回一下
    getInterceptors() {
        return this.instance;
    }
}
