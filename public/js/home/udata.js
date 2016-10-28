$(function(){
    //页面初始化的时候就发送一个ajax请求获取当前用户的基本信息
    
    //首先获取隐藏域中的uid
    var uid=$("#uid").val();
    //发送ajax请求获取用户信息
    $.get('/usermsg/'+uid+'/edit',function(data,status){
        if(data.isError){
            alert(data.message);
        }else{
            alert('获取到了用户信息');
            //如果成功获取了用户信息则将用户信息遍历到页面中
            if(data.usermsg.avatar){
                $('#avatar').attr({'title':'点击更换头像','src':data.usermsg.avatar});
            }else{
                $('#avatar').attr({'title':'点击上传头像','src':'http://xuefengoss.oss-cn-shanghai.aliyuncs.com/user/avatar/defaul.jpg'});
            }
        }
    });
})