const Koa = require('Koa');
const session = require('koa-session');

const app = new Koa();

app.keys = ['koa node js'];

app.use(session({
    key: 'koa:session',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true
}, app));

app.use(ctx => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
});

app.listen(3000, () => {
    console.log('server is running');
});