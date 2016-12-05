/*
 * 前台course模块控制器
 * 该控制器定义了所有关于course模块的方法
 */
//引入model模型
var course=require('../../models/course');

//显示course列表的方法
exports.index=function(req,res){
    //设置每页的显示条数
    var limit=20;
    
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
            res.render('home/course/index',{'title':'course','courses':pageData,'condition':condition,'pageLength':pageLength,'curPage':page,'isAll':isAll});
        }
    };
    
    //声明一个condition变量用来承载条件
    var condition;
    //声明一个变量用来承载是否显示的全部的二级分类
    var isAll;
    if(req.query.firstcate==null && req.query.secondcate==null){
        isAll=true;
        condition='';
        //调用course模型的fetch方法遍历数据传递给前台展示
        course.fetch(callback);
    }else if(req.query.secondcate==null){
        isAll=false;
        condition='firstcate='+req.query.firstcate+'&';
        course.findByFirstcate(req.query.firstcate,callback);
    }else if(req.query.firstcate==null){
        isAll=true;
        condition='secondcate='+req.query.secondcate+'&';
        course.findBySecondcate(req.query.secondcate,callback);
    }else{
        isAll=false;
        condition='firstcate='+req.query.firstcate+'&secondcate='+req.query.secondcate+'&';
        course.findBySecondcate(req.query.secondcate,callback);
    }
};
