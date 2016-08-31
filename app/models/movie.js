/*----movie的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的movieScheme
var movieSchema=require('../schemas/movie')
//通过mongoose.model()方法将movieSchema添加给movies集合
var movie=mongoose.model('movies',movieSchema);
//到处movie模型，是外部可以调用到它
module.exports=movie;
