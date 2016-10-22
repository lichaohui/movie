//重新发送短信/邮箱验证码的js
function countDown(time){
    var t=window.setInterval(function(){
        time--;
        if(time==0){
            document.getElementById("resend").setAttribute('disabled',false);
            document.getElementById("resend").innerHTML='重新发送';
            window.clearInterval(t);
        }else{
            document.getElementById("count").innerHTML=time;
        }
    },1000);
}


$(function(){
    countDown(10);
})