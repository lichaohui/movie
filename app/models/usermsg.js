/*----user的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的userMsgScheme
var userMsgSchema=require('../schemas/usermsg')
//通过mongoose.model()方法将userMsgSchema添加给userMsg集合
var userMsg=mongoose.model('userMsg',userMsgSchema);
//到处user模型，使外部可以调用到它
module.exports=userMsg;
