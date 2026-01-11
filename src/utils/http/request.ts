import http from "./http"
//定义一个接口，用于描述API响应的结构
interface ApiResponse{
    code:number,
    message:string,
    data:any
}

export function get(url:string,params?:any):Promise<ApiResponse>{
    return http.get(url,{params})
}

export function post(url:string,data?:any):Promise<ApiResponse>{
    return http.post(url,data)
}