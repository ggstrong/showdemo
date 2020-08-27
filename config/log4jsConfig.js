let path = require('path');

//日志根目录
let baseLogPath = path.resolve(__dirname, '../logs');
//debug普通日志
let debugPath = "/debug",
    debugFileName = "debug",
    debugLogPath = baseLogPath + debugPath + "/" + debugFileName;


//请求入口日志
let requestPath = "/request",
    requestFileName = "request",
    requestLogPath = baseLogPath + requestPath + "/" + requestFileName;

//info普通日志
let infoPath = "/info",
    infoFileName = "info",
    infoLogPath = baseLogPath + infoPath + "/" + infoFileName;

/*报错输出日志*/
//错误日志目录、文件名、输出完整路径
let errorPath = "/error",
    errorFileName = "error",
    errorLogPath = baseLogPath + errorPath + "/" + errorFileName;


let LOG4JS_CONF = {
    appenders: {
        baseLogPath: baseLogPath,
        out: {
            //设置控制台输出
            type: 'console'
        },
        requestLogger: {
            type: "dateFile",
            filename: requestLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: requestPath
        },
        infoLogger: {
            type: "dateFile",
            filename: infoLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: infoPath
        },
        errorLogger: {
            type: "dateFile",
            filename: errorLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: errorPath
        }
    },
    //供外部调用的名称和对应设置定义
    categories: {
        default: {appenders: ["rule-console"], "level": "all"},
        requestLogger: {appenders: ["requestLogger"], "level": "info"},
        infoLogger: {appenders: ["infoLogger"], "level": "info"},
        errorLogger: {appenders: ["errorLogger"], "level": "error"},
    }
}

module.exports = {
    appenders: {
        out: {
            //设置控制台输出
            type: 'console'
        },
        ruleconsole: {type: "console"},
        requestLogger: {
            type: "dateFile",
            filename: requestLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: requestPath
        },
        infoLogger: {
            type: "dateFile",
            filename: infoLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: infoPath
        },
        errorLogger: {
            type: "dateFile",
            filename: errorLogPath,
            pattern: "-yyyy-MM-dd-hh.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            maxLogSize: 1024000,
            numBackups: 3,
            path: errorPath
        }
    },
    //供外部调用的名称和对应设置定义
    categories: {
        default: {appenders: ["ruleconsole"], "level": "all"},
        requestLogger: {appenders: ["requestLogger"], "level": "info"},
        infoLogger: {appenders: ["infoLogger"], "level": "info"},
        errorLogger: {appenders: ["errorLogger"], "level": "error"},
    }
}