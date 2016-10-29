/*
 * 自定义的上传文件到阿里的函数
 */
function uploadFileToAlioss(e,path,callback){
    //获取上传的文件对象
    var file = e.target.files[0];
    //获取上传文件的名称
    var fileName=e.target.files[0].name;
    //获取上传文件的格式
    var format=fileName.split('.')[1];
    /*
     * 设置上传文件保存到阿里oss的名称为时间戳加后缀名
     * path表示阿里oss中的我们自建的文件夹
     */
    var uploadName=path+new Date().getTime()+'.'+format;
    $("#sub").text('正在上传中').attr("disabled",true);
    //上传文件
    client.multipartUpload(uploadName, file).then(function (result) {        
        /*
         * 上传大文件的时候阿里会使用分片上传，
         * 不会返回url，
         * 所以为了照顾到大文件上传只能用这种拼接的方式来存储url了
         */
        var url='http://'+client.options.bucket+'.'+client.options.region+'.'+'aliyuncs.com/'+result.name;
        callback(url);
        $("#sub").text('submit').attr("disabled",false);
    }).catch(function (err) {
        console.log(err);
    });
};