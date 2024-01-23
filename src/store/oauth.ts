import { getCaptcha, login, postCaptcha, register } from "@/request/oauth";
import { defineStore } from "pinia";

export const OauthStore = defineStore("oauth",{
    state:()=>({
        image:{
            base64:"",
            key:"",
            thumb:"",
            max:0
        },
        token:""
    }),
    actions:{
        getCaptcha(){
            let that = this;
            return getCaptcha().then((value)=>{
                if(value.status === 0){
                    that.image.base64 = value.data.base64
                    that.image.thumb = value.data.thumb
                    that.image.key = value.data.key
                    that.image.max = Number(value.data.max)

                }
                return value
            })
        },
        veriCaptcha(points:number[]){
            return postCaptcha(this.image.key,points)
        },
        login(email:string,password:string){
            return login(email,password,this.image.key).then(value=>{
                if(value.status === 0){
                    this.token = value.data.token
                }
                return value;
            })
        },
        register(email:string,password:string){
            return register(email,password,this.image.key)
        }
    },
})