import http, {RequestConfigType} from "@/utils/http";

export const toNano = (amount: number) => amount * 10 ** 9;
export const formNano = (amount: number) => amount / 10 ** 9;
export const formDataTostring = (formData: FormData)=>{
    const parameters = [];
    for (const pair of formData.entries()) {
        parameters.push(
            encodeURIComponent(pair[0]) + '=' +
            encodeURIComponent(pair[1].toString())
        );
    }
    return parameters.join("&");
}
export function requestT(time:number=300){
    let timeoutId: null | ReturnType<typeof setTimeout> = null
    return <T>(config: RequestConfigType): Promise<T> => {
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        return new Promise((resolve, reject) => {
            timeoutId = setTimeout(()=>{
                http.request<T>(config).then(resolve).catch(reject);
            },time);
        });
    }
}