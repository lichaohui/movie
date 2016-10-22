//重新发送短信/邮箱验证码的js
function countDown(time){
    var t=window.setInterval(function(){
        time--;
        while(time>1){
            document.getElementById("count").innerHTML=time;
        }else{
            window.clearInterval(t);
            document.getElementById("count").setAttribute('disabled',false);
        }
    },1000);
}


$(function(){
    countDown(60);
})