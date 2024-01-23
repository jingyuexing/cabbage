import { serviceAxios } from "."

// /api/v1/oauth/captcha
export function getCaptcha(){
    return serviceAxios.get("oauth/captcha")
}

export function postCaptcha(key:string,points:number[]){
    return serviceAxios.post("oauth/captcha",{
        key,
        dots:points
    })
}

export function register(email:string,password:string,key:string){
    return serviceAxios.post("oauth/register",{
        email,
        password,
        key
    })
}

export function login(email:string,password:string,key:string){
    return serviceAxios.post("oauth/login",{
        email,
        password,
        key
    })
}