//引入model模型
var learn=require('../../models/learn');

exports.index=function(req,res){
    //设置每页的显示条数
    var limit=2;
    
    /*
     * 通过一个三元表达式来设置page
     * 如果page参数存在则page等于参数中的page
     * 如果不存在则默认为1
     */
    var page;
    req.query.page ? page=parseInt(req.query.page) : page=1;
    
    //回调函数
    var callback=function(err,data){
        if(err){
            console.log(err);
        }else{
            //一共有多少页就是math.ceil(数据的总长度除以每页显示多少条)
            var pageLength=Math.ceil(data.length/limit);
            //从所有数据中返回当前页应有的数据
            var pageData=data.slice((page-1)*limit,page*limit);
            
            res.render('home/user/learn',{'title':'我的课程','learns':pageData,'condition':condition,'pageLength':pageLength,'curPage':page});
        }
    };
    //获取请求参数中的用户id
    var uid=req.query.uid;
    //设置条件
    var condition='uid='+uid+'&';
    //查询出数据来
    learn.findByUser(uid,callback);
}

exports.query=function(req,res,next){
    //查询出当前用户是否学习过当前课程
    if(req.session.user){
        /*
         * 如果用户有登录，
         * 则查找该用户是否学习过该课程
         * 并将查询出来的数据存储到session中
         */
        learn.findByUC(req.session.user._id,req.query.cid,function(err,data){
            //将数据赋值给变量learndata以便待会发送给前台
            req.params.learndata=data;
            next();
        });
    }else{
        next();
    }
}