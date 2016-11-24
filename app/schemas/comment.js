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
    /*
     * ref属性表示主键来源与哪个集合
     */
    from:{type:_id,ref:'userMsg'},
    url:String,
    pageTitle:String,
    content:String,
    totalReply:Number,
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
     * 初始化页面的时候获取当前url下最新的三条评论的方法
     */
    findByUrl:function(url,callback){
        return this.find({url:url}).sort({'meta.created_at':-1}).limit(3).populate('from','name').exec(callback);
    },
    //查看当前url下更多评论的方法
    findMoreByUrl:function(url,from,limit,callback){
        return this.find({url:url}).skip(from).sort({'meta.created_at':-1}).limit(limit).populate('from','name').exec(callback);
    },
    
    //获取某个用户评论的方法
    findByUser:function(userId,callback){
        return this.find({from:userId}).sort({'meta.created_at':-1}).limit(3).populate('movie','name').exec(callback);
    },
    //加载某个用户更多评论的方法
    findMoreByUser:function(uid,from,limit,callback){
        return this.find({from:uid}).skip(from).sort({'meta.created_at':-1}).limit(limit).populate('from','name').exec(callback);
    },
    
    /*
     * 添加一个叫做findById的静态方法
     * 该方法返回通过id查找出来的那条数据
     */
    findById:function(id,callback){
        return this.findOne({_id:id}).populate('from','name').exec(callback);
    }
};

/*
 * 通过module.exports将commentSchema对外公开，
 * 这样外部就可以访问到commentSchema
 */
module.exports=commentSchema;
