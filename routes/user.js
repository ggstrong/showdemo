let Koa = require('koa'),
    router=require('koa-router')(),
    bodyParse=require('koa-bodyparser'),
    userstylingbook=require('./user/stylingbook'),
    axios = require('axios');

let app = new Koa();
app.use(bodyParse());

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

router.post('/doAdd',async (ctx)=>{ //注册页面
    const rep=await baseURL({
        url: '/doAdd',
        method: 'post',
        data: ctx.request.body
    });
    ctx.body=rep.data;
})


router.post('/doLogin',async (ctx)=>{ //登陆接口

    const rep=await baseURL({
        url: '/doLogin',
        method: 'post',
        data: ctx.request.body
    });
    console.log(rep.data);
    ctx.body=rep.data;


})

router.get('/showInfo',async (ctx)=>{ //展示个人信息页面

    await ctx.render('register',{
        list:list
    })
})



router.use('/stylingbook',userstylingbook);//用户推荐的子路由
module.exports=router;