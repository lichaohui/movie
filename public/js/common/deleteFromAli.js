//异步删除阿里云的资源
function deleteFromOss(url){
    //分割资源的url来获取资源在阿里云的objectkey
    var objectKey=url.split(".com/")[1];
    //发送异步请求删除旧的资源
    $.ajax({
        url:'/admin/playbill/delete?objectKey='+objectKey,
        type:'delete',
        success:function(result){
            console.log(result);
        }
    })
}