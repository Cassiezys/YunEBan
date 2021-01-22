let proxyObj={}
proxyObj['/']={
    //websocket
    ws:false,

    //代理到哪里去
    target:'http://localhost:8081',

    //发送请求时host设置成target
    changeOrigin: true,

    //前置路径 不需要重写
    pathRewrite:{
        '^/':'/'
    }
}

//通过Nodejs转发
module.exports={
    //配置默认访问的端口（路径）
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}