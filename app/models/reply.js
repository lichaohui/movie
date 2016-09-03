/*----reply的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的replyScheme
var replySchema=require('../schemas/reply')
//通过mongoose.model()方法将replySchema添加给replys集合
var reply=mongoose.model('replys',replySchema);
//到处reply模型，是外部可以调用到它
module.exports=reply;
