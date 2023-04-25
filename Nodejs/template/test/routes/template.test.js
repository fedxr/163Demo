// 测试用例
const app = require('../../server/index');
const request = require('supertest')(app);
const assert = require('power-assert');

describe('# test routes', function () {
    it('POST /xhr/v1/template', done => {
        const temp = {
            name: 'mocha-test',
            template: '<h2>hello ${name}</h2>',
            data: '{name: "mocha"}'
        }
        request.post('/xhr/v1/template', temp).expect(200).end((err, res) => {
            if (err) return done(err);
            assert(res.body.code === 200);
            assert(res.body.msg === 'success');
            assert(typeof res.body.data === 'object', '返回数据应为对象');
            // assert(typeof res.body.data.name === temp.name, '需返回新增的模板内容');
            done();
        })
    })
    
    it('GET /xhr/v1/template', done => {
        request.get('/xhr/v1/template').expect(200).end((err, res) => {
            if (err) return done(err);
            assert(res.body.code === 200);
            assert(res.body.msg === 'success');
            assert(Array.isArray(res.body.data), '返回数据应为数组类型');
            done();
        })
    })

    it('GET /xhr/v1/template/:id', done => {
        request.get('/xhr/v1/template/6305d2e0b633ec714dd28790').expect(200).end((err, res) => {
            if (err) return done(err);
            assert(res.body.code === 200);
            assert(res.body.msg === 'success');
            assert(typeof res.body.data === 'object', '返回数据应为对象');
            assert(res.body.data.name === 'test put', '返回数据应该与数据库一致');
            done();
        })
    })

    it('DELETE /xhr/v1/template/:id', done => {
        request.delete('/xhr/v1/template/6305d2e0b633ec714dd28790').expect(200).end((err, res) => {
            if (err) return done(err);
            assert(res.body.code === 200);
            assert(res.body.msg === '删除成功');
            done();
        })
    })
});