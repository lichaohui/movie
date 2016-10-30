/*--------省市区三级联动--------*/
//这个函数是必须的，因为在geo.js里每次更改地址时会调用此函数 
function promptinfo(){  
    var s1 = document.getElementById('s1'); 
    var s2 = document.getElementById('s2'); 
    var s3 = document.getElementById('s3'); 
} 
setup();

$(function(){
    //页面初始化的时候就发送一个ajax请求获取当前用户的基本信息    
    //首先获取隐藏域中的uid
    var uid=$("#uid").val();
    //发送ajax请求获取用户信息
    $.get('/usermsg/'+uid+'/edit',function(data,status){
        if(data.isError){
            alert(data.message);
        }else if(data.usermsg!=null){
            /*
             * 如果成功获取了用户信息则将用户信息遍历到页面中
             * 并修改表单的属性
             */
            $("#form").attr({'action':'/usermsg/'+uid,'method':'put'});
            $('#avathum').attr('src',data.usermsg.avatar);
            $('#avatar').val(data.usermsg.avatar);
            $('#name').val(data.usermsg.name);
            $('input[name=sex][value='+data.usermsg.sex+']').attr('checked',true);
            $("#position").find('option[value='+data.usermsg.position+']').attr("selected",true);
            preselect(data.usermsg.province);
            precity(data.usermsg.city);
            precounty(data.usermsg.county);
            promptinfo();
            $('#signature').val(data.usermsg.signature);
        }
    });
    
    /*----点击提交按钮时候通过jquery.form.js插件异步提交表单----*/
    $("#sub").click(function(){
        $(this).text('请稍后..').attr('disabled',true);
        var url=$("#form").attr('action');
        var type=$('#form').attr('method');
        $("#form").ajaxSubmit({
            type:type,
            url:url,
            success:function(data){
                alert(data.message);
                setTimeout(function(){window.location.reload();},1000);
            },
        });
    });
    
    $('#crop').click(function(){
        $('#cform').ajaxSubmit({
            
        })
    })
})

function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if(maxWidth){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;
        if(rateWidth > rateHeight){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
            rate=rateWidth;
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
            rate=rateHeight;
        }
    }  
    return param;
}

function change(file){
    // Get a reference to the fileList
    var files = !!file.files ? file.files : [];
    // If no files were selected, or no FileReader support, return
    if (!files.length || !window.FileReader) return;
        // Create a new instance of the FileReader
        var reader = new FileReader();
        // Read the local file as a DataURL
        reader.readAsDataURL(files[0]);
        // When loaded, set image data as background of div
        reader.onloadend = function(){
        var img=$('#photo');
        img.attr("src",this.result);
        $("#view_photo").attr("src",this.result);
        img.load(function(){
          // 加载完成 
          var img=$('#photo');
          img.width('100%');
          img.height('100%'); 
          var rect = clacImgZoomParam(300, 300, img.width(), img.height());
          img.width(rect.width);
          img.height(rect.height); 
          $("#preview").width(img.width()/3);
          $("#preview").height(img.width()/3*selectrate);
          init();
        });
    }
}

selectrate=1;
rate=1;
function preview(img, selection) {
    if (!selection.width || !selection.height)
    return;
    var img=$("#view_photo");
    var scaleX =  $("#preview").width() / selection.width;
    var scaleY =  $("#preview").height() / selection.height;
    $('#preview img').css({
        width : Math.round(scaleX *  $("#photo").width()),
        height : Math.round(scaleY * $("#photo").height()),
        marginLeft : -Math.round(scaleX * selection.x1),
        marginTop : -Math.round(scaleY * selection.y1)
    });			
    $("#startX").val(Math.round(selection.x1*rate));
    $("#startY").val(Math.round(selection.y1*rate));
    $("#width").val(Math.round(selection.width*rate));
    $("#height").val(Math.round(selection.height*rate));
}
			
$(function() {
    init();
});
function init(){
    var width=$('#photo').width();
    var height=$('#photo').height();
    $('#photo').imgAreaSelect({
        aspectRatio : "1:1",
        handles : true,
        fadeSpeed : 200,
        onSelectChange : preview,
    });
}