$(function(){
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