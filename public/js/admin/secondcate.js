$(function(){
    /*----通过一级分类进行二级分类的筛选----*/
    $("#parent").change(function(){
        var url='/admin/secondcate?parent='+$(this).val();
        location.href=url;
    });
    
    /*
     * 如果是通过一级分类进行二级分类的筛选
     * 页面加载的时候初始化筛选下拉框的选中项
     */
    var scate=$("#scate").val();
    alert(scate);
    //$("#parent").find('option[value='+scate+']').attr("selected",true);
    $("#parent").find('option').eq(0).attr("selected",true);
    alert('hello');
    
    /*----异步编辑二级分类----*/
    $(".edit").click(function(){
        //通过id获取特定的那条数据
        var id=$(this).attr('data-id');
        $("#form").attr("action","/admin/secondcate/update/"+id);
        $.get('/admin/secondcate/edit/'+id,function(data,status){
            $("#id").val(data._id);
            $("#name").val(data.name);
            $("#parentcate").val(data.parentcate);
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
    
    /*----异步删除二级分类----*/
    $(".del").click(function(){
        if(confirm('Are your sure remove it?')){
            var id=$(this).attr('data-id');
            $.ajax({
                url: '/admin/secondcate/delete/'+id,
                type:'DELETE',
                success:function(result){
                    alert(result.message);
                    location.reload();
                }
            });
        }
    });
})