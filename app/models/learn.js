/*----learn的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的learnScheme
var learnSchema=require('../schemas/learn')
//通过mongoose.model()方法将learnSchema添加给learns集合
var learn=mongoose.model('learns',learnSchema);
//到处learn模型，是外部可以调用到它
module.exports=learn;
