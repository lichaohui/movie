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
//引入moment模块用来格式化时间
app.locals.moment=require('moment');
//引入Morgan模块用来设置日志的输出格式
var morgan=require('morgan');

//设置一个存储数据库地址的变量
var dbUrl='mongodb://localhost/imooc';

//设置模板引擎
app.set('view engine','jade');
//设置视图的根目录
app.set('views','./resource/views');

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

/*
 * 根据环境来设置一些属性
 * 比如在开发环境下开启debug等
 */
if(app.get('env')=='development'){
    //在页面上显示异常信息
    app.set('showStackError',true);
    //log日志的输出格式
    app.use(morgan(':method : url : status'));
    //编译jade模板的额时候格式化html代码
    app.locals.pretty=true;
    //开始数据库的debug调试
    mongoose.set('debug',true);
};

//连接数据库,传入上面定义好的dbUrl
mongoose.connect(dbUrl);

//设置服务端口为环境变量中的port，如果不存在就设置为3000
var port=process.env.PORT || 3000;

//启动服务并监听端口
app.listen(port);

//引入前台和后台的路由文件
//require('./app/routes/route.js')(app);
require('./app/routes/routeAdmin.js')(app);

console.log('server running at port: '+port);

