//引入Mogoose建模工具模块
var mongoose=require('mongoose');

var _id=mongoose.Schema.Types.ObjectId;

//设计learn(用户学习课程)数据表结构
var learnSchema=new mongoose.Schema({
    uid:{type:_id,ref:'users'},
    cid:{type:_id,ref:'courses'},
    lastque:{type:Number,default:1},
    meta:{
        created_at:{
            type:Date,
            default:Date.now()
        },
    }
});

/*
 * 通过Schema对象的pre()方法可以为数据模型的操作（增删该查设置回调函数），
 * 有两个参数，
 * 第一个参数是要为哪个操作设置回调，
 * 第二个参数就是要设置的回调方法
 * 为learnSchema设置保存数据的方法，
 * 当保存的数据是新添加的时候，
 * 更新created_at和updated_at都为当前时间，
 * 如果数据不是新添加的是新修改的，
 * 则只更新updated_at为当前时间
 */
learnSchema.pre('save',function(next){
    /*
     * 可以通过isNew判断当前数据是否为新的
     * 如果是新的则返回true,
     * 否则返回false,
     * this表示当前保存的数据
     */
    if(this.isNew){
        this.meta.created_at=this.meta.updated_at=Date.now();
    }
    //然后通过next()进行下一步操作
    next();
});

/*
 * 为learnSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
learnSchema.statics={
    //通过uid查询数据
    findByUser:function(uid,callback){
        return this.findOne({uid:uid}).populate('uid','name').exec(callback);
    },
    /*
     * 通过uid(用户id)并且cid(课程id)的方式查询数据
     * 查询出某个用户是否观看过某个课程
     */
    findByUC:function(uid,cid){
        return this.findOne({uid:uid,cid:cid}).populate('uid','name');
    }
};

/*
 * 通过module.exports将learnSchema对外公开，
 * 这样外部就可以访问到learnSchema
 */
module.exports=learnSchema;