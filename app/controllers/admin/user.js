/*----定义后台用户模块的所有方法----*/
//引入model模型
var user=require('../../models/user');

//展示用户列表的方法
exports.index=function(req,res){
    //设置每页的显示条数
    var limit=10;
    //设置condition变量用来承载条件
    var condition;
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
            res.render('admin/user/list',{'title':'user','users':pageData,'pageLength':pageLength,'curPage':page,'condition':condition});
        }
    };
    
    if(req.query.name==null){
        /*
         * 如果不是通过用户名来进行搜索的
         * 那么条件condition就等于''
         * 就查询出所有的用户返回给前台
         */
        condition={'value':'','string':''};
        user.fetch(callback);
    }else{
        /*
         * 如果是通过用户名来进行条件搜索的
         * 就查询出指定用户名的用户返回给前台
         * 并将条件condition设置一下
         */
        condition={
            'value':req.query.name,
            'string':'name='+req.query.name+'&'
        };
        user.findByName(req.query.name,callback);
    }
};