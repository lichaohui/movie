//引入Mogoose建模工具模块
var mongoose=require('mongoose');

var _id=mongoose.Schema.Types.ObjectId;

//设计video数据表结构
var videoSchema=new mongoose.Schema({
    name:String,
    queue:Number,
    intro:String,
    course:{type:_id,ref:'courses'},
    src:String,
    meta:{
        created_at:{
            type:Date,
            default:Date.now()
        },
        updated_at:{
            type:Date,
            default:Date.now()
        }
    }
});

/*
 * 通过Schema对象的pre()方法可以为数据模型的操作（增删该查设置回调函数），
 * 有两个参数，
 * 第一个参数是要为哪个操作设置回调，
 * 第二个参数就是要设置的回调方法
 * 为videoSchema设置保存数据的方法，
 * 当保存的数据是新添加的时候，
 * 更新created_at和updated_at都为当前时间，
 * 如果数据不是新添加的是新修改的，
 * 则只更新updated_at为当前时间
 */
videoSchema.pre('save',function(next){
    /*
     * 可以通过isNew判断当前数据是否为新的
     * 如果是新的则返回true,
     * 否则返回false,
     * this表示当前保存的数据
     */
    if(this.isNew){
        this.meta.created_at=this.meta.updated_at=Date.now();
    }else{
        this.meta.updated_at=Date.now();
    }
    //然后通过next()进行下一步操作
    next();
});

/*
 * 为videoSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
videoSchema.statics={
    /*通过课程查找视频*/
    findByCourse:function(course,callback){
        return this.find({course:course}).sort('meta.updated_at').populate('firstcate','name').populate('secondcate','name').populate('course','name').exec(callback);
    },
    
    /*
     * 添加一个叫做findById的静态方法
     * 该方法返回通过id查找出来的那条数据
     */
    findById:function(id,callback){
        return this.findOne({_id:id}).populate('firstcate','name').populate('secondcate','name').populate('course','name').exec(callback);
    }
};

/*
 * 通过module.exports将videoSchema对外公开，
 * 这样外部就可以访问到videoSchema
 */
module.exports=videoSchema;