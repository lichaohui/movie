$(function(){
    /*----异步加载更多评论---*/
    $("#viewMore").click(function(){
        var n=$("#comments li").length;
        var panel;
        var movieId=$("#movieId").val();
        //发送ajax请求获取评论
        $.get('/comment/more',{from:n,limit:5,movieId:movieId},function(data,status){
            if(data.length==0){
                $("#more").text('已经到底了');
                $("#viewMore").attr('disabled',true);
            }else{
                //显示出收起评论按钮
                $("#hiddenall").removeClass('hidden');
                //判断用户是否登录
                var isLogin=$('#isLogin').val();
                if(isLogin=='yes'){
                    //用户登录状态下填充的内容
                    for(var i=0;i<data.length;i++){
                        panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from.name+'<time class="pull-right">'+data[i].meta.created_at+'</time></div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-primary btn-xs">reply</button> <button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies">view replies</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data[i].from._id+'><input type="hidden" name="toWhichComment" value='+data[i]._id+'><input type="hidden" name="movie" value='+data[i].movie+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></textarea></div><div class="form-group"><b class="username"></b><button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                        $("#comments").append(panel);
                    }
                }else{
                    //用户登录状态下填充的内容
                    for(var i=0;i<data.length;i++){
                        panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from.name+'<time class="pull-right">'+data[i].meta.created_at+'</time></div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-xs">login and reply</button><button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies">view replies</button></div></li>';
                        $("#comments").append(panel);
                    }
                }    
            }
        })
    });
    //收起评论
    $('#hiddenall').click(function(){
        $("#comments li:gt(2)").remove();
        $("#more").text('查看更多');
        $("#viewMore").attr('disabled',false);
        $(this).addClass('hidden');
    });
    
    //格式化日期时间的函数
    function date2str(x, y) {
       var z = {
          y: x.getFullYear(),
          M: x.getMonth() + 1,
          d: x.getDate(),
          h: x.getHours(),
          m: x.getMinutes(),
          s: x.getSeconds()
       };
       return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
          return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
       });
    }
    
    //展示和收起回复表单
    $(document).on("click",".reply",function(){
        var userid=$("#userid").val();
        var username=$("#username").val();
        $('.username').text(username);
        $("[name='from']").val(userid);
        if($(this).siblings('.replyForm').hasClass('hidden')){
            $(this).siblings('.replyForm').removeClass('hidden');
        }else{
            $(this).siblings('.replyForm').addClass('hidden');
        }
    }); 
    
    //异步提交登录表单
    $("#login").click(function(){
        var url=$("#form").attr('action');
        $("#form").ajaxSubmit({
            type:'post',
            url:url,
            success:function(data){
                if(data.isError){
                    $("#warning").text(data.message).removeClass('hidden');
                }else{
                    $('#warning').addClass('hidden');
                    $("#success").text(data.message).removeClass('hidden');
                    setTimeout(function(){window.location.reload();},1000);
                }
            },
        });
    });
    
    //异步发表评论
    $("#subComment").click(function(){
        var con=$("#content").val();
        if(con==""){
            alert('请先填写评论内容！');
            $("#content").focus();
        }else{
            $("#commentForm").ajaxSubmit({
                type:'post',
                url:'/comment/store',
                success:function(data){
                    if(data.isError){
                        alert(data.message);
                    }else{
                        $(".panel-info").removeClass('panel-info').addClass('panel-default');
                        var panel='<li class="panel panel-info"><div class="panel-heading">'+data.comment.from.name+'<time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></div><div class="panel-body">'+data.comment.content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-primary btn-xs">reply</button> <button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies">view replies</button><form action="/comment/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data.comment.from._id+'><input type="hidden" name="movie" value='+data.comment.movie+'><input type="hidden" name="toWho" value='+data.comment.from._id+'><input type="hidden" name="toWhichComment" value='+data.comment._id+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here" required></textarea></div><div class="form-group"><b class="username"></b><button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                        $("#comments").prepend(panel);
                        $("#comments-tit").ScrollTo(800);
                    }
                }
            })
        }
    });
    
    //异步提交回复
    $(".replyBtn").click(function(){
        var con=$(this).parent('.replyForm').find("[name='content']").val();
        if(con==""){
            alert("请先填写回复内容！");
            $(this).parent('.replyForm').find("[name='content']").focus();
        }else{
            $("#replyFlag").attr('id','');
            $(this).parentsUntil('#comments').find('.panel-body').attr('id','replyFlag');
            $(this).parent('.replyForm').ajaxSubmit({
                type:'post',
                url:'/reply/store',
                success:function(data){
                    var rep='<ul class="list-group"><li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.reply.from.name+' </b>replied to<b> '+data.reply.toWho.name+'</b><time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></h5><p class="list-group-item-text">'+data.reply.content+'</p></li></ul>';
                    $("#replyFlag").append(rep);
                }
            })
        }
    });
})