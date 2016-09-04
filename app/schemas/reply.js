//引入Mogoose建模工具模块
var mongoose=require('mongoose');
/*
 * ObjectId主键，一种特殊而且非常重要的类型，
 * 每个Schema都会默认配置这个属性，属性名为_id，
 * 除非自己定义，方可覆盖
 */
var _id=mongoose.Schema.Types.ObjectId;

//设计reply数据表结构
var replySchema=new mongoose.Schema({
    //ref属性表示主键来源与哪个集合
    from:{type:_id,ref:'user'},
    toWhichComment:{type:_id,ref:'comment'},
    toWhichReply:{type:_id,ref:'reply'},
    content:String,
    meta:{
        created_at:{
            type:Date,
            default:Date.now()
        },
    }
});

/*
 * 为replySchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
replySchema.statics={    
    /*
     * 获取某个评论下所有回复的方法
     */
    findByComment:function(commentId,callback){
        return this.find({comment:commentId}).sort({'meta.created_at':-1}).exec(callback);
    },
    
    /*
     * 获取某个用户所有回复的方法
     */
    findByUser:function(userId,callback){
        return this.find({from:userId}).sort({'meta.created_at':-1}).exec(callback);
    },
};

/*
 * 通过module.exports将replySchema对外公开，
 * 这样外部就可以访问到replySchema
 */
module.exports=replySchema;
