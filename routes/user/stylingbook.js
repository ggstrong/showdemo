let router=require('koa-router')(); //子模块的子模块,管理员的用户



router.get('/',(ctx)=>{
    ctx.body='用户推荐';
})


router.get('/man',(ctx)=>{
    ctx.body='用户推荐男装';
})

router.get('/woman',(ctx)=>{
    ctx.body='用户推荐女装';
})

module.exports=router.routes();