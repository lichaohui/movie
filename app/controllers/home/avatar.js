var gm = require('gm')
var fs = require('fs')
var	imageMagick = gm.subClass({ imageMagick : true });
exports.crop = function(req, res) {
	res.header('Content-Type', 'text/plain');
    var path = req.files.orimage.path;	//获取用户上传过来的文件的当前路径
    imageMagick(path).resize(150, 150, '!').autoOrient().write('public/images/user/'+req.files.img.name, function(err){
        if (err){
            console.log(err);
            res.end();
        }else{
            console.log('图片保存成功');
        }
    })
};
