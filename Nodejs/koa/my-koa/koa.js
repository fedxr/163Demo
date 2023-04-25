const http = require('http');

class Koa {
    middleware = () => { }
    constructor() { }

    listen(port, cb) {
        const server = http.createServer((req, res) => {
            this.middleware(req, res);
        });
        server.listen(port, cb);
    }

    use(middleware) {
        this.middleware = middleware;
        return this;
    }
}

module.exports = Koa;

Promise.resolve('a').then('b').then(Promise.resolve('c')).then(console.log)
Promise.resolve({
    then: function() {
        console.log('a');
    }
}).then(()=>{
    console.log('d');
})