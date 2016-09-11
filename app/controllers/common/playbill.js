//测试失败
/*var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: '36rmkj8Ohcg1k7vR',
    accessKeySecret: 'BKXxwSfX4bVTRhCxU5yj99KDDIKV7a',
    bucket: 'xuefengoss'
});

exports.delete=function(req,res){
    var objectKey=req.params.objectKey;
    co(function* () {
        var result = yield client.delete('video/1473589931783.png');
        res.json({'message':'删除成功'});
    }).catch(function (err) {
        console.log(err);
    });
}*/
