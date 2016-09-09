$(function(){
    //在页面刚加载的时候就初始化 url input标识框的值为当前页面的url
    var url=window.location.pathname;
    $("[name='url']").val(url);
    
    /*----异步加载更多评论---*/
    $("#viewMore").click(function(){
        var n=$("#comments li").length;
        var panel;
        //发送ajax请求获取评论
        $.get('/comment/more',{from:n,limit:5,url:url},function(data,status){
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
                        panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from.name+'<time class="pull-right">'+data[i].meta.created_at+'</time></div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-primary btn-xs">reply</button> <button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies" data-cid='+data[i]._id+' data-name='+data[i].from.name+' data-time='+data[i].meta.created_at+' data-con='+data[i].content+'>view replies '+data[i].totalReply+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data[i].from._id+'><input type="hidden" name="toWhichComment" value='+data[i]._id+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></textarea></div><b class="username"></b> <button type="button" class="replyBtn btn btn-default btn-xs">submit</button></form></div></li>';
                        $("#comments").append(panel);
                    }
                }else{
                    //用户没有登录状态下填充的内容
                    for(var i=0;i<data.length;i++){
                        panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from.name+'<time class="pull-right">'+data[i].meta.created_at+'</time></div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary btn-xs">login and reply</button> <button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies" data-cid='+data[i]._id+' data-name='+data[i].from.name+' data-time='+data[i].meta.created_at+' data-con='+data[i].content+'>view replies '+data[i].totalReply+'</button></div></li>';
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
                        var panel='<li class="panel panel-info"><div class="panel-heading">'+data.comment.from.name+'<time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></div><div class="panel-body">'+data.comment.content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-primary btn-xs">reply</button> <button type="button" class="viewreply btn btn-default btn-xs" data-toggle="modal" data-target="#replies" data-cid='+data.comment._id+' data-name='+data.comment.from.name+' data-time='+date2str(new Date(), "yyyy-MM-d h:m:s")+' data-con='+data.comment.content+'>view replies '+data.comment.totalReply+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data.comment.from._id+'><input type="hidden" name="url" value='+data.comment.url+'><input type="hidden" name="toWho" value='+data.comment.from._id+'><input type="hidden" name="toWhichComment" value='+data.comment._id+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here" required></textarea></div><b class="username"></b> <button type="button" class="replyBtn btn btn-default btn-xs">submit</button></form></div></li>';
                        $("#comments").prepend(panel);
                        $("#comments-tit").ScrollTo(800);
                    }
                }
            })
        }
    });
    
    //异步提交回复
    $(document).on('click',".replyBtn",function(){
        var con=$(this).parent('.replyForm').find("[name='content']").val();
        if(con==""){
            alert("请先填写回复内容！");
            $(this).parent('.replyForm').find("[name='content']").focus();
        }else{
            if($(this).attr('isToReply')=="yes"){
                $(this).parent('.replyForm').ajaxSubmit({
                    type:'post',
                    url:'/reply/store',
                    success:function(data){
                        var rep='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.reply.from.name+'</b> replied to <b>'+data.reply.toWho.name+'</b><time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></h5><p class="list-group-item-text">'+data.reply.content+'</p><button type="button" class="reply btn btn-default btn-xs">reply '+data.reply.from.name+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.reply.from._id+'><input type="hidden" name="toWhichComment" value='+data.reply.toWhichComment+'><input type="hidden" name="toWhichReply" value='+data.reply.toWhichReply+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><button type="button" class="replyBtn btn btn-primary btn-xs" istoreply="yes">submit</button></form></li>';
                        $("#replies-list").prepend(rep);
                        $("#totalReply").text('view replies ('+data.totalReply+')');
                    }
                })
            }else{
                $("#replyFlag").attr('id','');
                $(this).parentsUntil('#comments').find('.panel-body').attr('id','replyFlag');
                $("#totalReply").attr('id','');
                $(this).parentsUntil(".panel").find('.viewreply').attr('id','totalReply');
                $(this).parent('.replyForm').ajaxSubmit({
                    type:'post',
                    url:'/reply/store',
                    success:function(data){
                        var rep='<ul class="list-group"><li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.reply.from.name+' </b>replied to<b> '+data.reply.toWho.name+'</b><time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></h5><p class="list-group-item-text">'+data.reply.content+'</p></li></ul>';
                        $("#replyFlag").append(rep);
                        $("#totalReply").text('view replies ('+data.totalReply+')');
                    }
                })
            }
        }           
    });

    //异步加载某条评论下的回复
    $(document).on('click',".viewreply",function(){
        $("#hiddenreply").addClass("hidden");
        $("#morereply").attr('disabled',false);
        $("#totalReply").attr('id','');
        $(this).attr('id','totalReply');
        var cid=$(this).attr('data-cid');
        $("#morereply").attr('data-cid',cid);
        var name=$(this).attr('data-name');
        var con=$(this).attr('data-con');
        var time=$(this).attr('data-time');
        $("#who").text(name);
        $("#time").text(time);
        $("#whatcon").text(con);
        $("#replies-list").empty();
        $.get('/reply/index',{"cid":cid},function(data,status){
            if(data.isError){
                alert(data.message);
            }else{
                var li;
                if(data.replies.length==0){
                    //如果没有回复则显示一个no reply
                    li='<li class="list-group-item">No reply!</li>';
                    $("#replies-list").append(li);
                }else{
                    //判断用户是否登录
                    var isLogin=$('#isLogin').val();
                    if(isLogin=='yes'){
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p><button type="button" class="reply btn btn-default btn-xs" >reply '+data.replies[i].from.name+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.replies[i].from._id+'><input type="hidden" name="toWhichComment" value='+cid+'><input type="hidden" name="toWhichReply" value='+data.replies[i]._id+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><b></b> <button type="button" class="replyBtn btn btn-primary btn-xs" isToReply="yes">submit</button></form></li>';
                            $("#replies-list").append(li);
                        }
                    }else{
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p></li>';
                            $("#replies-list").append(li);
                        }
                    }
                }
            }
        });
    });
    
    //加载某条评论下更多回复的方法
    $('#morereply').click(function(){
        var cid=$(this).attr('data-cid');
        var from=$("#replies-list .list-group-item").length;
        $.get('/reply/more',{'cid':cid,'from':from,'limit':3},function(data,status){
            if(data.isError){
                alert(data.message);
            }else{
                if(data.replies.length==0){
                    alert('已经到底了');
                    $('#morereply').attr('disabled',true);
                }else{
                    //判断用户是否登录
                    var isLogin=$('#isLogin').val();
                    if(isLogin=='yes'){
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p><button type="button" class="reply btn btn-default btn-xs" >reply '+data.replies[i].from.name+'</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data.replies[i].from._id+'><input type="hidden" name="toWhichComment" value='+cid+'><input type="hidden" name="toWhichReply" value='+data.replies[i]._id+'><div class="form-group"><textarea name="content" placeholder="Please input your comment here" required="" class="form-control"></textarea></div><b></b> <button type="button" class="replyBtn btn btn-primary btn-xs" isToReply="yes">submit</button></form></li>';
                            $("#replies-list").append(li);
                        }
                    }else{
                        for(var i=0;i<data.replies.length;i++){
                            li='<li class="list-group-item"><h5 class="list-group-item-heading"><b>'+data.replies[i].from.name+'</b> replied to <b>'+data.replies[i].toWho.name+'</b><time class="pull-right">'+data.replies[i].meta.created_at+'</time></h5><p class="list-group-item-text">'+data.replies[i].content+'</p></li>';
                            $("#replies-list").append(li);
                        }
                    }
                    $("#hiddenreply").removeClass('hidden');
                }
            }
        });
    });
    
    //收起回复
    $("#hiddenreply").click(function(){
        $("#replies-list .list-group-item:gt(2)").remove();
        $(this).addClass('hidden');
        $("#morereply").attr("disabled",false);
    });
})