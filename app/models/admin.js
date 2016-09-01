/*----admin的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的adminScheme
var adminSchema=require('../schemas/admin')
//通过mongoose.model()方法将adminSchema添加给admins集合
var admin=mongoose.model('admins',adminSchema);
//到处admin模型，使外部可以调用到它
module.exports=admin;
