//异步删除阿里云的资源
function deleteFromOss(url,obj){
    //分割资源的url来获取资源在阿里云的objectkey
    var objectKey=obj.split(".com/")[1];
    //发送异步请求删除旧的资源
    $.ajax({
        url:url+'?objectKey='+objectKey,
        type:'delete',
        success:function(result){
            console.log(result);
        }
    })
}