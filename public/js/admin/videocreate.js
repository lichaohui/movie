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
    
    $("#thumb").click(function(){
        $("#playbill").click();
    });
    
    $("#playbill").change(function(e){
        //获取上传的文件对象
        var file = e.target.files[0];
        //获取上传文件的名称
        var fileName=e.target.files[0].name;
        //获取上传文件的格式
        var format=fileName.split('.')[1];
        /*
         * 设置上传文件保存到阿里oss的名称为时间戳加后缀名
         * video/image是阿里oss中的一个自建的文件夹
         */
        var uploadName='video/image/'+new Date().getTime()+'.'+format;
        $("#sub").text('正在上传中').attr("disabled",true);
        //上传文件
        client.multipartUpload(uploadName, file).then(function (result) {
            
            /*
             * 上传大文件的时候阿里会使用分片上传，
             * 不会返回url，
             * 所以为了照顾到大文件上传只能用这种拼接的方式来存储url了
             */
            var url='http://'+client.options.bucket+'.'+client.options.region+'.'+'aliyuncs.com/'+result.name;
            $("#thumb").attr('src',url);
            $("input[name='playbill']").val(url);
            $("#sub").text('submit').attr("disabled",false);
        }).catch(function (err) {
            console.log(err);
        });
    });
})