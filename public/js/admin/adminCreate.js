$(function(){
    $("#sub").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'post',
            url:url,
            success:function(data){
                if(data.isError){
                    $("#success").addClass('hidden');
                    $("#warning").text(data.message).removeClass('hidden');
                }else{
                    $("#warning").addClass('hidden');
                    $("#success").text(data.message).removeClass('hidden');
                }
            },
        });
    })
})