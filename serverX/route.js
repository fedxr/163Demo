/*
    serverX Demo
*/ 

// get('/api/user/:id').to.json({name: 'mock username'});

//code:svrx --route route.js --mock -p json-server -p json-viewer

get('/api/mock/users').to.mock({
    'users|10': [{
        'id|+1':0,
        'name': '@name',
        'email': '@email',
        'age|18-30': 18
    }]
});

route('/api/(.*)').to.rewrite('{0}').jsonServer();