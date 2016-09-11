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
    
    
    var client = new OSS.Wrapper({
        region: 'oss-cn-shanghai',
        accessKeyId: '36rmkj8Ohcg1k7vR',
        accessKeySecret: 'BKXxwSfX4bVTRhCxU5yj99KDDIKV7a',
        bucket: 'xuefengoss'
    });
    
    $("#playbill").change(function(e){
        //获取上传的文件对象
        var file = e.target.files[0];
        var fileName=e.target.files[0].name;
        var format=fileName.split('.')[1];
        client.multipartUpload(new Date().getTime()+'.'+format, file).then(function (result) {
            console.log(result);
        }).catch(function (err) {
            console.log(err);
        });
    });
})