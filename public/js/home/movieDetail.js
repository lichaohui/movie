$(function(){
    $('.reply').click(function(){
        var user=$("#user");
        if(user){
            alert(user);
            alert('你已经登录了');
        }else{
            alert(user);
            alert('对不起 你还没有登录过');
        }
        if($(this).siblings('.replyForm').hasClass('hidden')){
            $(this).siblings('.replyForm').removeClass('hidden');
        }else{
            $(this).siblings('.replyForm').addClass('hidden');
        }
    });
})