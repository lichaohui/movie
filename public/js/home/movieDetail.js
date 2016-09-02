$(function(){
    $(".reply").toggle(function(){
        $(this).siblings('.replyForm').removeClass('hidden');
    },function(){
        $(this).siblings('.replyForm').addClass('hidden');
    });
})