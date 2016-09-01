$(function(){
    //异步登录操作
    $("#login").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'post',
            url:url,
            success:function(data){
                if(data.isError){
                    $("#warning").text(data.message).removeClass('hidden');
                }else{
                    $("#warning").addClass('hidden');
                    $("#sub").attr('disabled','disabled');
                    $("#success").text(data.message).removeClass('hidden');
                    setTimeout(function(){location.href='/admin';},3000);
                }
            },
        });
    });
    
    /*----异步编辑管理员----*/
    $(".edit").click(function(){
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/admin/update/"+id);
        $.get('/admin/admin/edit/'+id,function(data,status){
            $("#id").val(data._id);
            $("#name").val(data.name);
            $("#password").val(data.password);
        });
    });
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'put',
            url:url,
            success:function(data){
                alert(data);
                setTimeout(function(){window.location.reload();},1000);
            },
        });
    });
    
    /*----异步删除管理员----*/
    $(".del").click(function(){
        if(confirm('Are your sure remove it?')){
            var id=$(this).attr('data-id');
            $.ajax({
                url: '/admin/admin/delete/'+id,
                type:'DELETE',
                success:function(result){
                    alert(result.message);
                    location.reload();
                }
            });
        }
    });
})