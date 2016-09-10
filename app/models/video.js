/*----video的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的videoScheme
var videoSchema=require('../schemas/video')
//通过mongoose.model()方法将videoSchema添加给videos集合
var video=mongoose.model('videos',videoSchema);
//到处video模型，是外部可以调用到它
module.exports=video;
