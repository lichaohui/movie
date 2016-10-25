/*----user的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的userScheme
var userSchema=require('../schemas/user')
//通过mongoose.model()方法将userSchema添加给users集合
var user=mongoose.model('users',userSchema);

var data=user.find({"$or" :  [ {‘name’:'lucy'} , {‘email’:‘lucy’} ] });
console.log(data);

//到处user模型，使外部可以调用到它
module.exports=user;
