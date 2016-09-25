$(function(){
    //页面加载的时候将所有一级分类加载下拉选择框中
    $.get('/admin/firstcate',{'isAjax':true},function(data,status){
        var opt;
        for(var i=0;i<data.length;i++){
            opt='<option value='+data[i]._id+'>'+data[i].name+'</option>';
            $("select[name='parentcate']").append(opt);
        }
    });
})