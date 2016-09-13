$(function(){
    /*----异步编辑电影----*/
    $(".edit").click(function(){
        //获取当前电影的一级分类
        var fcate=$(this).attr('data-fcate');
        //将当前电影的一级分类在一级分类下拉框中默认选中
        $("#parentcate").find('option[value='+fcate+']').attr("selected",true);
        /*
         * 通过当前电影的一级分类异步获取所有该一级分类下的所有二级分类
         * 然后通过当前电影的二级分类，
         * 将当前电影的二级分类的下拉框设置为默认选中
         */
        //获取当前电影的所属的二级分类
        $("#secondcate").empty();
        var scate=$(this).attr('data-scate');
        $.get('/admin/secondcate/query',{pid:fcate},function(data,status){
            var opt;
            for(var i=0;i<data.length;i++){
                opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                $("#secondcate").append(opt);
            }
            //将当前电影的一级分类在二级分类下拉框中默认选中
            $("#secondcate").find('option[value='+scate+']').attr("selected",true);
        });
        
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/video/update/"+id);
        $.get('/admin/video/edit/'+id,function(data,status){
            $("#name").val(data.name);
            $("#author").val(data.author);
            $("#thumb").attr('src',data.playbill);
            $("input[name='playbill']").val(data.playbill);
            $("input[name='src']").val(data.src);
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
                //setTimeout(function(){window.location.reload();},1000);
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