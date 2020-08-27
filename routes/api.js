let Koa = require('koa'),
    router = require('koa-router')(),
    bodyParse = require('koa-bodyparser'),
    axios = require('axios'),
    logsUtil = require('../module/log4jsUtil');
const { AXIOS_CONF } = require('../config/config');
const redisClient = require("../module/redisUtil");


let app = new Koa();
app.use(bodyParse());




const baseURL = axios.create(AXIOS_CONF);

function getData(ctx,url) {
    let qu=ctx.query;
    return baseURL({
        url: url,
        method: 'get',
        headers: ctx.request.headers,
        param: ctx.query
    });
}


async function postData(ctx,url) {
    // console.log('ctx----------------------------------------');
    // console.log(ctx);
    return baseURL({
        url: url,
        method: 'post',
        headers: ctx.request.headers,
        data: ctx.request.body
    });
}

async function checkRedis() {
    let num = null;
    await redisClient.get("HHH", function (err, result) {
        if (err) {
            console.error('err----------------------------' + err);
        } else {
            console.log('------------------------------' + result);
            num = result;
        }
    });
    if (num == null) {
        redisClient.set("HHH", 1);
    } else {
        if (parseInt(num) >= 10) {
            return false;
        }
        redisClient.set("HHH", parseInt(num) + 1);
    }
    return true;
}


router.post('/', async (ctx) => {
    // console.log('header---------------------------------------');
    // console.log(ctx.request.headers);
    logsUtil.logReq(ctx);
    const startTime = new Date();
    let returnData = {};
    let flag = await checkRedis();
    console.log(flag);
    if (flag) {
        await axios.all([postData(ctx,'postMethodA'), postData(ctx,'postMethodB'), getData(ctx,'getB')])
            .then(axios.spread(function (a, b, c) {
                // 两个请求现在都执行完成
                console.log(a.data);
                console.log(b.data);
                console.log(c.data);
                let dataA = a.data;
                let dataB = b.data;
                let dataC = c.data;
                if ('Y' === dataA.flag)
                    returnData.nameA = dataA.name;
                if ('Y' === dataB.flag)
                    returnData.nameB = dataB.name;
                if ('Y' === dataC.flag)
                    returnData.nameC = dataC.name;
            })).catch(function (error) {
                logsUtil.logError(ctx, error, startTime);
                returnData.msg=error.message;
            })
    } else {
        logsUtil.logInfo('前10名已经出现');
        returnData.msg = '前10名已经出现';
    }


    ctx.body = JSON.stringify(returnData)


})

module.exports = router.routes(); //在模块暴露路由并且启动路由