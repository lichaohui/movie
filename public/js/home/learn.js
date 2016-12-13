$(function(){
    //课程列表展示瀑布流效果
    var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
        });
    });
    //删除课程
    $('.del').click(function(){
        if(confirm('确定要删除吗？')){
            var id=$(this).attr('data-id');
            $.ajax({
                url: '/learn/delete/'+id,
                type:'DELETE',
                success:function(result){
                    alert(result.message);
                    location.reload();
                }
            });
        }
    })
})