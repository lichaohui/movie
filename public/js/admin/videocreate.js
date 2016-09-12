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
    
    //异步删除阿里云的资源
    function deleteFromOss(url,callback){
        //分割资源的url来获取资源在阿里云的objectkey
        var objectKey=url.split(".com/")[1];
        //发送异步请求删除旧的资源
        $.ajax({
            url:'/admin/playbill/delete?objectKey='+objectKey,
            type:'delete',
            success:function(result){
                callback();
            }
        })
    }
    
    //上传视频海报
    $("#thumb").click(function(){
        $("#playbill").click();
    });
    $("#playbill").change(function(e){
        var val=$('input[name="playbill"]').val();
        if(val==""){
            //path表示阿里oss中的文件夹
            var path='video/image/';
            var callback=function(url){
                $("#thumb").attr('src',url);
                $("input[name='playbill']").val(url);
            };
            uploadFileToAlioss(e,path,callback);
        }else{
            deleteFromOss(val,function(){
                //path表示阿里oss中的文件夹
            var path='video/image/';
            var callback=function(url){
                $("#thumb").attr('src',url);
                $("input[name='playbill']").val(url);
            };
            })
        }
    });
    
    //上传视频
    $("#src").change(function(e){
        var path='video/video/';
        var callback=function(url){
            $("input[name='src']").val(url);
        };
        uploadFileToAlioss(e,path,callback);
    });
})