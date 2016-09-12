$(function(){
    /*----异步编辑电影----*/
    $(".edit").click(function(){
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/video/update/"+id);
        $.get('/admin/video/edit/'+id,function(data,status){
            $("#id").val(data._id);
            $("#name").val(data.name);
            $("#author").val(data.author);
            $("#country").val(data.country);
            
            $("#playbill").attr(data.playbill);
            $("#src").val(data.src);
            $("#intro").text(data.intro);
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
    
    /*----异步删除电影----*/
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