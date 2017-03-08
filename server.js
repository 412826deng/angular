'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const request = require('request');
let mime = require('./mime.json');
http.createServer((req, res) => {

    //处理请求的url编码,进行解码
    console.log(req.url)
    //处理具体请求
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile('./index.html', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' });
            return res.end(data);
        });
    } else if (req.url.startsWith('/node_modules')||req.url.startsWith('/assets')||req.url.startsWith('/views')) { 
        fs.readFile('.' + req.url, (err, data) => {
            if (err) throw err;
            let mimeKey = path.extname(req.url); 
            let mimeType = mime[mimeKey] || 'text/plain'; 
            res.writeHead(200, { 'Content-type': mimeType });
            return res.end(data);
        });
    } else if (req.url === '/favicon.ico') {
        return res.end('111');
    } else if(req.url.startsWith('/getMsg')){
         //获取callback带的参数
        let funcName=require('url').parse(req.url,true).qurey.callback
        res.end(funcName+'('+'{"name":"jack"}'+')');
    }else if(req.url.startsWith('/v2')){//中间层转发，前后端分离
        var x = request('https://api.douban.com'+req.url)//创建对象
        req.pipe(x);//将原来请求对象的信息封装到x对象中
        x.pipe(res);//将x对象相应的数据传输到原来的响应中
    }

}).listen(80, () => {
    console.log('服务器被启动了')
});





