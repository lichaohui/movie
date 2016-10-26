//引入Mogoose建模工具模块
var mongoose=require('mongoose');
//引入bcrypt来对密码进行加密
var bcrypt=require('bcrypt');

//设计user数据表结构
var userSchema=new mongoose.Schema({
    name:{
        unique:true,
        type:String
    },
    password:String,
    phone:{
        unique:true,
        sparse:true,
        type:Number
    },
    email:{
        unique:true,
        sparse:true,
        type:String
    },
    level:{
        type:Number,
        default:0
    },
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
 * 通过Schema对象的pre()方法可以为数据模型的操作（增删该查设置中间件），
 * 设置的中间件将在操作之前被调用
 * 有两个参数，
 * 第一个参数是要为哪个操作设置回调，
 * 第二个参数就是要设置的回调方法
 * 为userSchema设置保存数据的方法，
 * 当保存的数据是新添加的时候，
 * 更新created_at和updated_at都为当前时间，
 * 如果数据不是新添加的是新修改的，
 * 则只更新updated_at为当前时间
 */
userSchema.pre('save',function(next){
    var user=this;
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
    };
    
    /*
     * 使用bcrypt的genSalt生成盐
     * 然后在回调函数中将生成的盐加给密码,
     * 再进行hash加密
     * 有两个参数，
     * 第一个参数是复杂程度，
     * 默认为10
     * 第二个参数是生成salt之后的回调函数
     * 回调函数中的第一个参数是err
     * 第二个参数是生成的salt(盐)
     * 再回调函数中可以用生成以后的盐加给密码进行hash
     */
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            return next(err);
        }else{
            /*
             * 如果没有错误就对生成的盐和密码进行hash
             * 有三个参数，
             * 第一个参数是密码
             * 第二个参数是生成的salt
             * 第三个参数是回调函数，
             * 回调函数中有两个参数，
             * 第一个参数是err,
             * 第二个参数是hash后生成的值
             */
            bcrypt.hash(user.password,salt,function(err,hashresult){
                if(err){
                    return next(err);
                }else{
                    /*
                     * 如果没有错误
                     * 就把密码和salt经过hash后得出的结果作为用户的密码
                     * 保存到数据库中
                     */
                    user.password=hashresult;
                    //进行下一步
                    next();
                }
            });
        }
    });
});

/*
 * 为userScehma添加方法
 */
userSchema.methods={
    //添加一个比较密码的方法
    comparePassword:function(password,callback){
        /*
         * bcrypt的compare()方法可以比较两个值是否匹配
         * 在这里我们可以比较表单提交的密码和数据库中的密码是否匹配
         * 回调函数中的第二个参数是一个布尔值，
         * 如果匹配则返回true,
         * 不匹配则返回false
         */
        bcrypt.compare(password,this.password,function(err,isMatch){
            if(err){
                return callback(err);
            }else{
                callback(null,isMatch);
            }
        })
    }
};

/*
 * 为userSchema添加一些自定义的静态方法
 * scheme对象的静态方法都在其statics的属性中保存
 * 所以可以通过为schema对象的statics属性添加成员，
 * 来为对象添加静态方法
 */
userSchema.statics={
    /*
     * 添加一个叫做fetch的静态方法
     * 该方法返回所有通过更新时间排序后的数据
     * 然后通过exec()方法执行回调函数
     * 方法中必须有一个参数callback,
     * 该参数就是方法的回调函数
     */
    fetch:function(callback){
        return this.find({}).sort('meta.updated_at').exec(callback);
    },
    
    /*
     * 通过姓名查找用户
     * 进行的是模糊查找
     */
    findByName:function(name,callback){
        //先通过使用RegExp，来构建正则表达式对象
        var regName=new RegExp(name);
        //然后将正则表达式对象作为条件传入来进行查找
        return this.find({'name':regName}).sort('meta.updated_at').exec(callback);
    },
    
    /*
     * 添加一个叫做findById的静态方法
     * 该方法返回通过id查找出来的那条数据
     */
    findById:function(id,callback){
        return this.findOne({_id:id}).exec(callback);
    },
    
    /*
     * 通过手机号查询用户
     */
    findByPhone:function(phone,callback){
        return this.find({'phone':phone}).exec(callback);
    },
    
    /*
     * 通过邮箱查询用户
     */
    findByEmail:function(email,callback){
        return this.find({'email':email}).exec(callback);
    },
};

/*
 * 通过module.exports将userSchema对外公开，
 * 这样外部就可以访问到userSchema
 */
module.exports=userSchema;
