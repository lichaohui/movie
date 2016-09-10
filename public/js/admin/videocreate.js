$(function(){
    //根据选中的一级菜单ajax异步加载响应的二级菜单
    $("#firstcate").select(function(){
        alert($(this).val());
    })
})