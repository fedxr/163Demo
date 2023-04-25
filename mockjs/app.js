/*
    mockjs demo
*/
const express = require('express');
const app = express();
const port = '3001';

const Mock = require('mockjs');

var data = Mock.mock({
    'list|1-10': [{
        'id|+1':1
    }]
})
console.log(JSON.stringify(data, null, 4));

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/SgeSecret/getUserCertBase64.json', (req, res) => {
    res.send({
        success: true,
        result: 'MIICvDCCAmGgAwIBAgIFIEV5AoEwDAYIKoEcz1UBg3UFADBdMQswCQYDVQQGEwJDTjEwMC4GA1UECgwnQ2hpbmEgRmluYW5jaWFsIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRwwGgYDVQQDDBNDRkNBIFRFU1QgU00yIE9DQTExMB4XDTIxMDgwMjA4NDM0OVoXDTIyMDgwMjA4NDM0OVowYDELMAkGA1UEBhMCQ04xDjAMBgNVBAoMBU9DQTExMQ8wDQYDVQQLDAZUUEMtUzMxFTATBgNVBAsMDEluZGl2aWR1YWwtMjEZMBcGA1UEAwwQYmVjbG91MDAwMDAwMDIwNTBZMBMGByqGSM49AgEGCCqBHM9VAYItA0IABNoEqi0HZSjmGsdwWWD9LFsX2xywHQRduy2W701aHGceXLLTwRE4xXTI'
    })
});

app.post('/SgeSecret/createKeyExchange.json', (req, res) => {
    res.send({
        success: true,
        result: 'post success'
    })
});

app.listen(port, () => {
    console.log(`port: ${port}`);
});

app.use(express.static('public'));

Mock.mock('/SgeSecret/getUserCertBase64.json', {
    code: 200,
    data: {
        'list|1-10': [{
            'id|+1':1
        }]
    }
})