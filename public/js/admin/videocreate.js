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
        //首先获取是否之前上传过文件
        var val=$("input[name='playbill']").val();
        if(val==""){
            //如果之前没有上传过文件
            
            //获取上传的文件对象
            var file = e.target.files[0];
            //获取上传文件的名称
            var fileName=e.target.files[0].name;
            //获取上传文件的格式
            var format=fileName.split('.')[1];
            /*
             * 设置上传文件保存到阿里oss的名称为时间戳加后缀名
             * video是阿里oss中的一个自建的文件夹
             */
            var uploadName='video/'+new Date().getTime()+'.'+format;
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
            }).catch(function (err) {
                console.log(err);
            });
        }else{
            /*
             * 如果之前上传过图片
             * 我们就可以判断用户是想用现在的图片替换掉之前的图片
             * 那么我们就可以发送一个异步请求删除掉之前上传的图片
             * 然后再上传新的图片
             * 由于浏览器无法操作bucket (无法对alioss bucket中的图片进行删除)
             * 所以我们就需要使用Nodejs的sdk在服务器端来进行图片的删除操作
             * 删除完毕之后我们就可以在客户端使用js sdk的浏览器部分来进行图片上传了
             */
            $.ajax({
                url: '/admin/playbill/delete',
                objectKey:val,
                type:'DELETE',
                success:function(result){
                    alert(result.message);
                }
            })
        }
    });
})