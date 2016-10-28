/*----定义前台用户模块的所有方法----*/
//引入model模型
var userMsg=require('../../models/usermsg');
//引入underscore模块可以用来更新数据
var underscore=require('underscore');

//展示用户信息页面的方法
exports.index=function(req,res){
    //获取请求参数中传递的关联用户id
    var uid=req.query.uid;
    //渲染用户信息模板并将uid作为参数传递过去
    res.render('home/user/data',{'title':'基本信息','uid':uid});
};

//编辑某个用户信息的时候获取该用户信息的方法
exports.edit=function(req,res){
    //获取请求参数中的关联用户id
    var uid=req.params.uid;
    //通过findByUid方法获取指定的用户信息并返回json格式给前台
    userMsg.findByUid(uid,function(err,data){
        if(err){
            res.json({'isError':true,'message':'获取用户信息失败，请稍后重试'});
        }else{
            console.log(data);
            res.json({'isError':false,'usermsg':data});
        }
    });
};

//添加某个用户基本信息的方法
exports.store=function(req,res){
    //拼装表单数据
    var newmsg=new userMsg({
        'uid':req.body.uid,
        'name':req.body.name,
        'avatar':req.body.avatar,
        'sex':req.body.sex,
        'position':req.body.position,
        'province':req.body.province,
        'city':req.body.city,
        'county':req.body.county,
        'signature':req.body.signature
    });
    //向数据库中保存数据
    newmsg.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.redirect('/usermsg?uid='+req.body.uid);
        }
    })
};

//更新某个用户基本信息的方法
exports.update=function(req,res){
    //拿到表单提交过来的要修改的数据的uid
    var uid=req.params.uid;
    //拿到表单提交过来的数据
    var postumsg=req.body;
    //通过findByUid获取到要修改的那条数据
    userMsg.findByUid(uid,function(err,data){
        if(err){
            console.log(err);
        }else{
            /*
             * 通过underscore模块的extend()方法用表单提交过来的新数据替换之前的数据
             * 该方法有两个参数，
             * 第一个参数是要被替换掉的旧的数据
             * 第二个参数是新的数据
             */
            newumsg=underscore.extend(data,postumsg);
            //通过save方法保存数据并在回调函数中进行页面重定向
            newumsg.save(function(err,data){
                if(err){
                    console.log(err);
                }else{
                    console.log('开始跳转了');
                    res.redirect('/usermsg?uid='+uid);
                }; 
            });
        }
    });
}