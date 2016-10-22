//重新发送短信/邮箱验证码的js
var time=60;
var t=setTimeout(function(){
    time--;
    document.getElementById("count").innerHTML=time;
},1000);
window.onload=t;

$(function(){
    
    
})