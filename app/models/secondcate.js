/*----secondcate的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的secondcateScheme
var secondcateSchema=require('../schemas/secondcate')
//通过mongoose.model()方法将secondcateSchema添加给secondcates集合
var secondcate=mongoose.model('secondcates',secondcateSchema);
//到处secondcate模型，是外部可以调用到它
module.exports=secondcate;
