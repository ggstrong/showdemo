const Koa = require('koa'),
    router = require('koa-router')();

//使用子模块
let user = require('./routes/user.js'),
    api = require('./routes/api'),
    render = require('koa-art-template'),
    bodyParse = require('koa-bodyparser'),   //用于解析请求参数一定要
    path = require('path');

let app = new Koa();
app.use(bodyParse());
render(app, {
    root: path.join(__dirname, 'views'), //视图的位置
    extname: '.html', //文件后缀
    debug: process.env.NODE_ENV !== 'production' //是否开启debug
});

router.get('/', async (ctx) => { //主页,登陆页面
    await ctx.render('index')
})
router.get('/register', async (ctx) => { //注册页面

    await ctx.render('register')
})
//如果是 /user 就给user处理:配置子路由
router.use('/user', user.routes());
router.use('/api', api); //在模块暴露路由并且启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000)