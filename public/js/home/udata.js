/*--------省市区三级联动--------*/
//这个函数是必须的，因为在geo.js里每次更改地址时会调用此函数 
function promptinfo(){  
    var s1 = document.getElementById('s1'); 
    var s2 = document.getElementById('s2'); 
    var s3 = document.getElementById('s3'); 
} 
setup();

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
            $('#avatar').val(data.usermsg.avatar);
            $('#name').val(data.usermsg.name);
            $('input[name=sex][value='+data.usermsg.sex+']').attr('checked',true);
            $("#position").find('option[value='+data.usermsg.position+']').attr("selected",true);
            preselect(data.usermsg.province);
            precity(data.usermsg.city);
            precounty(data.usermsg.county);
            promptinfo();
            $('#signature').val(data.usermsg.signature);
        }
    });
    
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        $(this).text('请稍后..').attr('disabled',true);
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