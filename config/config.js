const env = process.env.NODE_ENV  // 环境参数

let REDIS_CONF= {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    prefix: 'sam:', //存诸前缀
    password: '123456',
    // ttl: 60 * 60 * 23,  //过期时间
    family: 4,
    db: 2
}

let AXIOS_CONF={
    baseURL: 'http://localhost:8080/',
    timeout: 3000,
    headers: {//指定响应头
        "Content-Type": "application/json;charset=utf-8",
        "Accept": "application/json"
    }
}


if (env === 'dev') {
    REDIS_CONF = {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        prefix: 'dev:', //存诸前缀
        password: '123456',
        // ttl: 60 * 60 * 23,  //过期时间
        family: 4,
        db: 2
    }
    AXIOS_CONF={
        baseURL: 'http://localhost:8080/',
        timeout: 3000,
        headers: {//指定响应头
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        }
    }


}
if (env === 'sit') {
    REDIS_CONF = {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        prefix: 'sit:', //存诸前缀
        password: '123456',
        // ttl: 60 * 60 * 23,  //过期时间
        family: 4,
        db: 3
    }
}

module.exports = {
    REDIS_CONF,
    AXIOS_CONF
}