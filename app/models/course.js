/*----course的数据模型----*/

//引入mongoose
var mongoose=require('mongoose');
//引入自己写好的courseScheme
var courseSchema=require('../schemas/course')
//通过mongoose.model()方法将courseSchema添加给courses集合
var course=mongoose.model('courses',courseSchema);
//到处course模型，是外部可以调用到它
module.exports=course;
