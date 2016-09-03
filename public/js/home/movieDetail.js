$(function(){
    /*----异步加载更多评论---*/
    $("#viewMore").click(function(){
        var n=$("#comments li").length;
        var panel;
        var movieId=$("#movieId").val();
        $.get('/comment/more',{from:n,limit:5,movieId:movieId},function(data,status){
            if(data.length==0){
                $("#viewMore").text('已经到底了').attr('disabled',true);
                $("#hiddenall").removeClass('hidden');
            }else{
                for(var i=0;i<data.length;i++){
                    panel='<li class="panel panel-default"><div class="panel-heading">'+data[i].from+'<time class="pull-right">'+data[i].meta.created_at+'</time></div><div class="panel-body">'+data[i].content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button><form action="/reply/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value=""><input type="hidden" name="toWho" value='+data[i].from+'><input type="hidden" name="toWhichComment" value='+data[i]._id+'><input type="hidden" name="movie" value='+data[i].movie+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here"></textarea></div><div class="form-group"><b class="username"></b><button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                    $("#comments").append(panel);
                }
            }
        })
    });
    //收起评论
    $('#hiddenall').click(function(){
        $("#comments li:gt(2)").remove();
        $("#viewMore").text('查看更多').attr('disabled',false);
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
                        var panel='<li class="panel panel-info"><div class="panel-heading">'+data.comment.from+'<time class="pull-right">'+date2str(new Date(), "yyyy-MM-d h:m:s")+'</time></div><div class="panel-body">'+data.comment.content+'</div><div class="panel-footer"><button type="button" class="reply btn btn-default btn-xs">reply</button><form action="/comment/store" method="post" role="form" class="replyForm hidden"><input type="hidden" name="from" value='+data.comment.from+'><input type="hidden" name="movie" value='+data.comment.movie+'><input type="hidden" name="toWho" value='+data.comment.from+'><input type="hidden" name="toWhichComment" value='+data.comment._id+'><div class="form-group"><textarea class="form-control" name="content" placeholder="Please input your comment here" required></textarea></div><div class="form-group"><b class="username"></b><button type="submit" class="btn btn-default btn-xs">submit</button></div></form></div></li>';
                        $("#comments").prepend(panel);
                        $("#comments-tit").ScrollTo(800);
                    }
                }
            })
        }
    });
})