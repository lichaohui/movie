$(function(){
    $("#sub").click(function(){
        var password=$("#password").val();
        var passwordrepeat=$("#passwordrepeat").val();
        if(password==passwordrepeat){

        }else{
            alert('两次输入的密码不一致');
            return false;
        }
    });
})