//验证手机号的正则表达式
function isphone(phone){ 
    if(/^1[34578]\d{9}$/.test(phone)){ 
        return true;
    }else{
        return false; 
    } 
}

//验证邮箱的正则表达式
function isemail(email){
    if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)){
        return true;
    }else{
        return false;
    }
}