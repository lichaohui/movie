/*
 * gruntfile.js文件中配置了grunt的使用
 */

/*
 * 通过module.exports将参数为grunt的匿名函数发送出去
 * 回调函数中列出了grunt熬加载的任务
 */
module.exports=function(grunt){
    //grunt初始化配置，配置了grunt要执行的任务
    grunt.initConfig({
        //配置监控任务，监控jade模板文件和js文件
        watch:{
            jade:{
                files:['views/**'],
                options:{
                    livereload:true,
                }
            },
            js:{
                files:['public/js/**','models/**/*.js','schemas/**/*.js'],
                //tasks:['jsinit'],
                options:{
                    livereload:true,
                }
            }
        },
        
        //配置nodemon任务监控入口文件
        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_modules/**','.DS_Store'],
                    watchedExtensions:['js'],
                    watchedFolders:['./'],
                    debug:true,
                    delayTime:1,
                    env:{
                        port:3000,
                    },
                    cwd:__dirname
                }
            }
        },
        
        /*
         * 配置concurrent，
         * concurrent里面包含着要执行的watch和nodemon任务
         */
        concurrent:{
            tasks:['watch','nodemon'],
            options:{
                logConcurrentOutput:true,
            }
        }
    });
    
    /* 
     * grunt-contrib-watch可以监控在其里面注册的文件
     * 当这些文件改动时候会自动重启服务   
     */
    grunt.loadNpmTasks('grunt-contrib-watch');
    /* 
     * grunt-nodemon可以时时监控入口文件
     * 当入口文件改动时自动重启服务
     */
    grunt.loadNpmTasks('grunt-nodemon');
    /*
     * grung-concurrent是针对慢任务（比如sass的编译）的
     */
    grunt.loadNpmTasks('grunt-concurrent');
    
    //设置grunt不会因为某个语法错误或警告而中断整个服务
    grunt.option('force',true);
    
    /*
     * 为grunt注册默认的任务为concurrent
     * concurrent任务在上面已经注册好了，
     * concurrent任务中的tasks属性就包含了真正要执行的任务
     */
    grunt.registerTask('default',['concurrent']);
}