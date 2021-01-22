import axios from "axios"
import { Message } from 'element-ui';
import router from "@/router";

axios.interceptors.response.use(success => {
    if (success.status && success.status == 200){
        //业务逻辑错误
        if(success.data.code==500||success.data.code==401||success.data.code==403){
            Message.error({message:success.data.message});
            return;
        }
        //业务逻辑成功，返回业务信息
        if(success.data.message){
            Message.success({message:success.data.message})
        }
    }
    return success.data;
}, error => {
    if (error.response.status == 504||error.response.status == 404){
        Message.error({message:'服务器跑到外太空了( ╯□╰ )'})
    }else if (error.response.code == 403){
        Message.error({message:'权限不足，请联系管理员哭'})
    }else if (error.response.code == 401){
        Message.error({message:'未登录呀呀呀~'});
        router.replace('/')
    }else {
        if(error.response.data.message){
            Message.error({message:error.response.data.message})
        }else{
            Message.error({message:'未知错误'})
        }
    }
    return;
});

//前置路径
let base = '';

// 封装json格式的Post请求 请求的路径，参数
export const postRequest= (url,params)=>{
    return axios({
        method:'Post',
        url:'${base}${url}',
        data: params
    })
}