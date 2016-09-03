//引入Mogoose建模工具模块
var mongoose=require('mongoose');
/*
 * ObjectId主键，一种特殊而且非常重要的类型，
 * 每个Schema都会默认配置这个属性，属性名为_id，
 * 除非自己定义，方可覆盖
 */
var _id=mongoose.Schema.Types.ObjectId;

//设计comment数据表结构
var commentSchema=new mongoose.Schema({
    //ref属性表示主键来源与哪个集合
    movie:{type:_id,ref:'movie'},
    from:{type:_id,ref:'user'},
    toWho:{type:_id,ref:'user'},
    toWhichComment:{type:_id,ref:'comment'},
    content:String,
    meta:{
        created_at:{
            type:Date,
            default:Date.now()
        },
    }
});

/*
 * 为commentSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
commentSchema.statics={    
    /*
     * 获取某个电影下所有评论的方法
     */
    findByMovie:function(movieId,callback){
        return this.find({movie:movieId}).exec(callback);
    },
    
    //获取某个用户所有评论的方法
    findByUser:function(userId,callback){
        return this.find({from:userId}).exec(callback);
    },
    
    /*
     * 添加一个叫做findById的静态方法
     * 该方法返回通过id查找出来的那条数据
     */
    findById:function(id,callback){
        return this.findOne({_id:id}).exec(callback);
    }
};

/*
 * 通过module.exports将commentSchema对外公开，
 * 这样外部就可以访问到commentSchema
 */
module.exports=commentSchema;
