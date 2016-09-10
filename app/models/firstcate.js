/*----firstcate的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的firstcateScheme
var firstcateSchema=require('../schemas/firstcate')
//通过mongoose.model()方法将firstcateSchema添加给firstcates集合
var firstcate=mongoose.model('firstcates',firstcateSchema);
//到处firstcate模型，是外部可以调用到它
module.exports=firstcate;
