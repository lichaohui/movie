$(function(){
    //页面初始化的时候就发送一个ajax请求获取当前用户的基本信息
    
    //首先获取隐藏域中的uid
    var uid=$("#uid").val();
    //发送ajax请求获取用户信息
    $.get('/usermsg/'+uid+'/edit',function(data,status){
        if(data.isError){
            alert(data.message);
        }else if(data.usermsg.length>0){
            //如果成功获取了用户信息则将用户信息遍历到页面中
            $('#avatar').attr({'title':'点击更换头像','src':data.usermsg.avatar});
            $('#name').val(data.usermsg.name);
            $('input[name=sex][value='+data.usermsg.sex+']').attr('checked',true);
            $("#position").find('option[value='+data.usermsg.position+']').attr("selected",true);
            $('#signature').val(data.usermsg.signature);
        }
    });
})