//测试失败
var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: '36rmkj8Ohcg1k7vR',
    accessKeySecret: 'BKXxwSfX4bVTRhCxU5yj99KDDIKV7a',
    bucket: 'xuefengoss'
});

exports.delete=function(req,res){
    var objectKey=req.params.objectKey;
    console.log('hello'+objectKey);
    co(function* () {
        var result = yield client.delete('video/image/1473600214057.png');
        res.json({'message':'删除成功'});
    }).catch(function (err) {
        console.log(err);
    });
}
