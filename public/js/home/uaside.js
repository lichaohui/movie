$(function(){
    var sign=$("#pagesign").val();
    $("#page-"+sign).addClass('active');
    $(".active").siblings('.colnav').addClass('in');
    
    alert($(window).width());
})
