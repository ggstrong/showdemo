const log4js = require('log4js');
const LOG4JS_CONF = require('../config/log4jsConfig');

let path = require('path');


//加载配置文件
log4js.configure(LOG4JS_CONF);

//调用预先定义的日志名称
let resLogger = log4js.getLogger("requestLogger"),
    infoLogger = log4js.getLogger("infoLogger"),
    errorLogger = log4js.getLogger("errorLogger"),
    consoleLogger = log4js.getLogger();

//格式化日志
let formatText = {
    info: function(info) {
        let logText = new String();
        //响应日志头信息
        logText += "\n" + "***************info log start ***************" + "\n";
        //响应内容
        logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";
        //响应日志结束信息
        logText += "*************** info log end ***************" + "\n";
        return logText;
    },
    request: function(ctx) {
        let req = ctx.request;
        let logText = new String();
        let method = req.method;
        //访问方法
        logText += "request method: " + method + "\n";
        //请求原始地址
        logText += "request originalUrl:  " + req.originalUrl + "\n";
        //客户端ip
        logText += "request client ip:  " + req.ip + "\n";
        //开始时间
        let startTime;
        //请求参数
        if (method === 'GET') {
            logText += "request query:  " + JSON.stringify(req.query) + "\n";
            // startTime = req.query.requestStartTime;
        } else {
            logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
            // startTime = req.body.requestStartTime;
        }
        return logText;
    },
    error: function(ctx, err, resTime) {
        let logText = new String();
        //错误信息开始
        logText += "\n" + "*************** error log start ***************" + "\n";
        //添加请求日志
        logText += formatText.request(ctx, resTime);
        //服务器响应时间
        logText += "response time: " + resTime + "\n";
        //错误名称
        logText += "err name: " + err.name + "\n";
        //错误信息
        logText += "err message: " + err.message + "\n";
        //错误信息
        logText += "err response: " + err.response.data.message+ "\n";
        //错误详情
        logText += "err stack: " + err.stack + "\n";
        //错误信息结束
        logText += "*************** error log end ***************" + "\n";
        return logText;
    }
}

module.exports = {
    //封装request日志
    logReq: function(ctx) {
        if (ctx) {
            resLogger.info(formatText.request(ctx));
        }
    },
    //封装普通日志
    logInfo: function(info) {
        if (info) {
            infoLogger.info(formatText.info(info));
        }
    },
    //封装错误日志
    logError: function(ctx, error, starTime) {
        const resTime=new Date()-starTime;
        if (ctx && error) {
            errorLogger.error(formatText.error(ctx, error, resTime));
        }
    }
};