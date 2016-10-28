$(function(){
    //页面初始化的时候就发送一个ajax请求获取当前用户的基本信息    
    //首先获取隐藏域中的uid
    var uid=$("#uid").val();
    //发送ajax请求获取用户信息
    $.get('/usermsg/'+uid+'/edit',function(data,status){
        if(data.isError){
            alert(data.message);
        }else if(data.usermsg!=null){
            /*
             * 如果成功获取了用户信息则将用户信息遍历到页面中
             * 并修改表单的属性
             */
            $("#form").attr({'action':'/usermsg/'+uid,'method':'put'});
            $('#avathum').attr({'title':'点击更换头像','src':data.usermsg.avatar});
            $('#name').val(data.usermsg.name);
            $('input[name=sex][value='+data.usermsg.sex+']').attr('checked',true);
            $("#position").find('option[value='+data.usermsg.position+']').attr("selected",true);
            $('#signature').val(data.usermsg.signature);
        }
    });
    
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        var url=$("#form").attr('action');
        var type=$('#form').attr('method');
        $("#form").ajaxSubmit({
            type:type,
            url:url,
            success:function(data){
                alert(data.message);
                setTimeout(function(){window.location.reload();},1000);
            },
        });
    });
})