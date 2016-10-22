//验证手机号的正则表达式
function isphone(phone){ 
    if(/^1[34578]\d{9}$/.test(phone)){ 
        return true;
    }else{
        return false; 
    } 
}
