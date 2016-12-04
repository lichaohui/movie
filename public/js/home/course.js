$(function(){
    var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        alert('执行了');
        $container.masonry({
            columnWidth: '.item',
            itemSelector: '.item'
        });
    });
})