import { AxiosRequestConfig } from 'axios';
declare module 'axios' {
    export interface AxiosRequestConfig {
        duplicateRequestValidation?: boolean;
        duplicateRequestValidationTime?: number;
    }
}
