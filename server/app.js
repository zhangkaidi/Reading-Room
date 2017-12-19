// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入Express
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(api);

app.listen(8085);
console.log('Server up: http://localhost:8085');