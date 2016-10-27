//引入Mogoose建模工具模块
var mongoose=require('mongoose');
/*
 * ObjectId主键，一种特殊而且非常重要的类型，
 * 每个Schema都会默认配置这个属性，属性名为_id，
 * 除非自己定义，方可覆盖
 */
var _id=mongoose.Schema.Types.ObjectId;

//设计user数据表结构
var userMsgSchema=new mongoose.Schema({
    //关联users表的id
    uid:{
        type:_id,
        ref:'users'
    },
    //头像url地址
    avatar:String,
    //真实姓名
    name:String,
    //职位
    position:String,
    //省
    province:String,
    //市
    city:String,
    //县
    county:String,
    //性别
    sex:String,
    //个性签名
    signature:Text
});

/*
 * 为userSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
userMsgSchema.statics={    
    /*
     * 添加一个叫做findByUid的静态方法
     * 该方法返回通过关联的uid查找出来的那条数据
     */
    findByUid:function(uid,callback){
        return this.findOne({uid:uid}).exec(callback);
    }
};

/*
 * 通过module.exports将userMsgSchema对外公开，
 * 这样外部就可以访问到userMsgSchema
 */
module.exports=userMsgSchema;
