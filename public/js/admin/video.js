$(function(){
    /*----异步编辑视频----*/
    $(".edit").click(function(){
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/video/update/"+id);
        $.get('/admin/video/edit/'+id,function(data,status){
            $("#name").val(data.name);
            $("input[name='queue']").val(data.queue);
            $("input[name='src']").val(data.src);
            $("#video").attr('src',data.src);
            $("#intro").text(data.intro);
        });
    });
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'put',
            url:url,
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                alert(data);
                setTimeout(function(){window.location.reload();},1000);
            },
        });
    });
    
    /*----异步删除视频----*/
    $(".del").click(function(){
        if(confirm('Are your sure remove it?')){
            var id=$(this).attr('data-id');
            $.ajax({
                url: '/admin/video/delete/'+id,
                type:'DELETE',
                success:function(result){
                    alert(result.message);
                    location.reload();
                }
            });
        }
    });
})