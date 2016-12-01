$(function(){
    //根据选中的一级菜单ajax异步加载响应的二级菜单
    $("#parentcate").change(function(){
        $("#secondcate").empty();
        var pid=$(this).val();
        if(pid!=""){
            $.get('/admin/secondcate/query',{'pid':pid},function(data,status){
                if(data.isError){
                    alert(data.message);
                }else{
                    $("#secondcate").append('<option value="">请选择</option>');
                    var opt;
                    for(var i=0;i<data.length;i++){
                        opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                        $("#secondcate").append(opt);
                    }
                }
            });
        }
    });
    //根据选中的二级分类获取课程
    $("#secondcate").change(function(){
        $("#course").empty();
        var sid=$(this).val();
        if(sid!=""){
            $.get('/admin/course/query',{'sid':sid},function(data,status){
                if(data.isError){
                    alert(data.message);
                }else{
                    var opt;
                    for(var i=0;i<data.length;i++){
                        opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                        $("#course").append(opt);
                    }
                }
            });
        }
    });
    
    //上传视频
    $("#uploadvideo").click(function(){
        $("#src").click();
    });
    $("#src").change(function(e){
        var path='video/video/';
        var callback=function(url){
            $("input[name='src']").val(url);
            $("#video").attr('src',url);
        };
        uploadFileToAlioss(e,path,callback);
    });
})