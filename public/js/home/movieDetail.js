$(function(){
    $('.reply').click(function(){
        var user=$("#user").text();
        if(user){
            if($(this).siblings('.replyForm').hasClass('hidden')){
                $(this).siblings('.replyForm').removeClass('hidden');
            }else{
                $(this).siblings('.replyForm').addClass('hidden');
            }
        }else{
            alert('I\'m sorry you have not logged in, please login');
        }
    });
})