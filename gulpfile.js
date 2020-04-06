const gulp = require('gulp');//引入gulp模块，生成gulp对象

const html = require('gulp-minify-html'); //压缩html文件插件
const css = require('gulp-minify-css');//压缩css文件插件
const js = require('gulp-uglify');//压缩js文件插件

//es6转es5的三个模块
//gulp-babel@7   babel-core       babel-preset-es2015
const babel = require('gulp-babel');//主要 --这里不要加版本
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');

//sass编译
//gulp-sass gulp-sourcemaps gulp-load-plugins 
const sass = require('gulp-sass');
//引入生成.map文件模块
const sourcemaps = require('gulp-sourcemaps');
//生成.map文件
const plugins = require('gulp-load-plugins')();//返回的是一个函数体。需要再次执行。

//gulp-imagemin图片压缩(png)
const imagemin = require('gulp-imagemin');

//gulp-watch监听模块
const watch = require('gulp-watch');




//1.html文件进行压缩
gulp.task('uglifyhtml', () => {
    return gulp.src('src/html/*.html')
        .pipe(html())
        .pipe(gulp.dest('dist/src/html/'));
})

//压缩index.html
// gulp.task('indexuglifyhtml', () => {
//     return gulp.src('*.html')
//         .pipe(html())
//         .pipe(gulp.dest('dist/'));
// })


//2.css文件进行压缩
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/src/css/'));
})


//3.js文件进行压缩 es6转es5
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({//先将es6转换成es5
            presets: ['es2015']//es2015->es6  es2016->es7...
        }))
        .pipe(js())//再执行压缩
        .pipe(gulp.dest('dist/src/script/'));
});


//5.编译sass,同时生成.map文件(.map调式文件)
// gulp - sass gulp - sourcemaps gulp - load - plugins
gulp.task('compilesass', () => {
    return gulp.src('src/sass/*.scss')
        //初始化gulp-sourcemaps插件
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        //通过sourcemaps,生成.map文件
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/src/sass/'));
});


//6.图片压缩插件-imagemin@6
//对png最大的压缩，其他的格式几乎压不动。
gulp.task('uglifyimg', () => {
    return gulp.src('src/img/*.{png,gif,jpg,ico}')
        .pipe(imagemin())//执行压缩
        .pipe(gulp.dest('dist/src/img/'));
});


//7.监听插件-gulp-watch()
//参1:监听的目录，数组的形式
//参2:通过gulp.parallel()并行监听任务名。
//监听上面的任务，监听之前任务必须先跑一次。再进行监听。

//任务名为default,直接gulp运行，默认任务名。
gulp.task('default', function () {
    watch(['src/html/*.html', 'src/css/*.css', 'src/script/*.js','src/img/*.{png,gif,jpg,ico}'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs','uglifyimg'));
});