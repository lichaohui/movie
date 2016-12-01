$(function(){
    /*----异步编辑视频----*/
    $(".edit").click(function(){
        //获取当前视频的一级分类
        var fcate=$(this).attr('data-fcate');
        //将当前视频的一级分类在一级分类下拉框中默认选中
        $("#parentcate").find('option[value='+fcate+']').attr("selected",true);
        /*
         * 通过当前视频的一级分类异步获取所有该一级分类下的所有二级分类
         * 然后通过当前视频的二级分类，
         * 将当前视频的二级分类的下拉框设置为默认选中
         */
        //获取当前视频的所属的二级分类
        $("#secondcate").empty();
        var scate=$(this).attr('data-scate');
        $.get('/admin/secondcate/query',{pid:fcate},function(data,status){
            var opt;
            for(var i=0;i<data.length;i++){
                opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                $("#secondcate").append(opt);
            }
            //将当前视频的二级分类在二级分类下拉框中默认选中
            $("#secondcate").find('option[value='+scate+']').attr("selected",true);
        });
        /*
         * 通过当前视频的二级分类获取到所有该二级分类下的课程
         * 填充到课程下拉框中
         * 然后通过当前视频所属的课程id，
         * 将当前分类所属的课程设置为默认选中状态
         */
        $('#course').empty();
        var course=$(this).attr('data-course');
        $.get('/admin/course/query',{sid:scate},function(data,status){
            var opt;
            for(var i=0;i<data.length;i++){
                opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                $("#course").append(opt);
            }
            //将当前视频的所属课程在课程下拉框中默认选中
            $("#course").find('option[value='+course+']').attr("selected",true);
        });
        
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/video/update/"+id);
        $.get('/admin/video/edit/'+id,function(data,status){
            $("#name").val(data.name);
            $("input[name='queue']").val(data.queue);
            $("input[name='playbill']").val(data.playbill);
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