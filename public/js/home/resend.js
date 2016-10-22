//重新发送短信/邮箱验证码的js
function countDown(time){
    var t=window.setInterval(function(){
        time--;
        if(time==0){
            window.clearInterval(t);
            document.getElementById("resend").setAttribute('disabled',false).innerHTML='重新发送';
        }else{
            document.getElementById("count").innerHTML=time;
        }
    },1000);
}


$(function(){
    countDown(10);
})