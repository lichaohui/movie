//引入Mogoose建模工具模块
var mongoose=require('mongoose');

var _id=mongoose.Schema.Types.ObjectId;

//设计secondcate数据表结构
var secondcateSchema=new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    parentcate:{type:_id,ref:'firstcate'},
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
 * 为secondCateSchema设置保存数据的方法，
 * 当保存的数据是新添加的时候，
 * 更新created_at和updated_at都为当前时间，
 * 如果数据不是新添加的是新修改的，
 * 则只更新updated_at为当前时间
 */
secondcateSchema.pre('save',function(next){
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
 * 为secondcateSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
secondcateSchema.statics={
    /*
     * 添加一个叫做fetch的静态方法
     * 该方法返回所有通过更新时间排序后的数据
     * 然后通过exec()方法执行回调函数
     * 方法中必须有一个参数callback,
     * 该参数就是方法的回调函数
     */
    fetch:function(callback){
        return this.find({}).sort('meta.updated_at').populate('parentcate','name').exec(callback);
    },
};

/*
 * 通过module.exports将secondcateSchema对外公开，
 * 这样外部就可以访问到secondcateSchema
 */
module.exports=secondcateSchema;
