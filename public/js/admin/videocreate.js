$(function(){
    //根据选中的一级菜单ajax异步加载响应的二级菜单
    $("#parentcate").change(function(){
        $("#secondcate").empty();
        var pid=$(this).val();
        if(pid==""){
            $("#secondcate").empty();
        }else{
            $.get('/admin/secondcate/query',{'pid':pid},function(data,status){
                if(data.isError){
                    alert(data.message);
                }else{
                    var opt;
                    for(var i=0;i<data.length;i++){
                        opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
                        $("#secondcate").append(opt);
                    }
                }
            });
        }
    });
    
    //上传视频海报
    $("#thumb").click(function(){
        $("#playbill").click();
    });
    $("#playbill").change(function(e){
        //path表示阿里oss中的文件夹
        var path='video/image/';
        var callback=function(url){
            $("#thumb").attr('src',url);
            $("input[name='playbill']").val(url);
        };
        //上传文件
        uploadFileToAlioss(e,path,callback);
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