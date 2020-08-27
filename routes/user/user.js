let Koa = require('koa'),
    router=require('koa-router')(),
    render = require('koa-art-template'),
    path = require('path');

let app = new Koa();


router.get('/third',(ctx)=>{
    ctx.body='用户添加第三方信息';
})


module.exports=router.routes();