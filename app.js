//引入express
var express=require("express");
var app=express();
//引入bodyParser用来格式化表单数据
var bodyParser = require('body-parser');
//引入cookie-parser来使用cookie
var cookieParser = require('cookie-parser');
//引入session模块
var session = require('express-session');
//引入mongoose模块用来操作mongo数据库
var mongoose=require('mongoose');
/*
 * 引入connect-mongo模块用来做会话持久化
 * 可以将用户的session信息存储到mongodb中
 */
var mongoStore=require('connect-mongo')(session);
//引入underscore模块可以用来更新数据
var underscore=require('underscore');
//引入moment模块用来格式化时间
app.locals.moment=require('moment');

//引入model模型
var user=require('./models/user');
var movie=require('./models/movie');

//设置一个存储数据库地址的变量
var dbUrl='mongodb://localhost/imooc';

//设置模板引擎
app.set('view engine','jade');
//设置视图的根目录
app.set('views','./views');

//设置资源文件的存放位置
var serveStatic = require('serve-static');
app.use(serveStatic('public'));

//设置表单提交数据的格式化
app.use(bodyParser.urlencoded({extended: true}));

//使用session之前必须use一下cookieParser
app.use(cookieParser());
//中间件中使用session
app.use(session({
    secret:'imooc',
    /*
     * 传入一个store参数
     * store参数表示存入session信息
     * 可以处处到mongodb中
     * 通过实例化一个mongoStore对象存储session信息到mongo中
     * 实例化mongoStroe对象的时候需要传入一个json格式的参数
     * url表示数据库的地址
     * collection表示存储到哪个集合中
     */
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

//连接数据库,传入上面定义好的dbUrl
mongoose.connect(dbUrl);

//设置服务端口为环境变量总的port，如果不存在就设置为3000
var port=process.env.PORT || 3000;

//启动服务并监听端口
app.listen(port);

console.log('server running at port: '+port);

require(./route/route.js)(app);