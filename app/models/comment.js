/*----comment的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的commentScheme
var commentSchema=require('../schemas/comment')
//通过mongoose.model()方法将commentSchema添加给comments集合
var comment=mongoose.model('comments',commentSchema);
//到处comment模型，是外部可以调用到它
module.exports=comment;
