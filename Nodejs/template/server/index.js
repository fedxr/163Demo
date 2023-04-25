/*
    node连接mongodb操作演示, mongod --dbpath D:\ProgramFiles\MongoDB\data\db
    nodemon: 热更新;
    express: 服务器操作框架;
    mongoose: node环境下js操作mongodb;
    httpie: 命令行请求操作及结果显示;
    body-parser: 解析post请求中的body字段;
    mocha: 执行测试文件
    nyc: 覆盖测试，输出测试文档
    power-assert: node原生assert的扩展
    supertest: get post 等请求方法测试
*/ 
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const api = require('./middleware/api');
const bodyParser = require('body-parser');
const templateRouter = require('./routes/template');

// 连接mongodb
mongoose.connect('mongodb://127.0.0.1:27017/template', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(api);

app.use('/xhr/v1', templateRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen('8080', () => {
    console.log('server is running on http://localhost:8080');
});

module.exports = app;
