import axios from "axios"
import { Message } from 'element-ui';
import router from "@/router";

//请求拦截器
axios.interceptors.request.use(config=>{
    //如果存在token
    if (window.sessionStorage.getItem('tokenStr')){
        // 对应的config里面 加 一个Authorization 的关键词。
        config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr');
    }
    return config;
}, error => {
    console.log(error)
})

//响应拦截器：对于接口或者后端返回的代码做出回应
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
        method:'post',
        url:'${base}${url}',
        data: params
    })
}


// 封装json的put请求
export const putRequest=(url,params)=>{
    return axios({
        method: 'put',
        url: '${base}${url}',
        data:params
    })
}
// 封装json的get请求
export const getRequest= (url,params)=>{
    return axios({
        method:'get',
        url:'${base}${url}',
        data: params
    })
}


// 封装json的delete请求
export const deleteRequest=(url,params)=>{
    return axios({
        method: 'delete',
        url: '${base}${url}',
        data:params
    })
}