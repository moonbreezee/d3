// gulpfile.js// gulpfile.js

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// 错误处理
const notify = require("gulp-notify");

// stylus
const stylus = require('gulp-stylus');
const base64 = require('gulp-base64');

const livereload = require('gulp-livereload');

// 文件路径配置
const SRC_JS = 'task/src/*.js';
const SRC_CSS = 'task/src/*.styl';
const DEST = 'task/dest';

// 错误处理函数,错误处理要紧跟在编辑过程之后，不然编译出错在执行别的命令就会跳出来
let handleErrors = function(){
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
    this.emit();//提交
}

// es6 -> es5
gulp.task('babelify', function(){
    return gulp.src(SRC_JS)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'es2016', 'es2017'],
            plugins: [
                [
                    "transform-runtime", {
                        "polyfill": false, 
                        "regenerator": true
                    }
                ]
            ]
        }))
		.on('error', handleErrors)   // 错误处理
        .pipe(sourcemaps.write({
            includeContent: false,
            sourceRoot: 'src'
        }))
        .pipe(gulp.dest(DEST))
        // .pipe(livereload());
});

// stylus -> css
gulp.task('stylus', function () {
  return gulp.src(SRC_CSS)    
    .pipe(sourcemaps.init())
    .pipe(stylus()) // 编译.styl
    .pipe(base64()) // 这里的base64 要放在stylus后边
	.pipe(sourcemaps.write({
		includeContent: false,
		sourceRoot: 'src'
	}))
    .on('error', handleErrors)     //交给notify处理错误
    .pipe(gulp.dest(DEST))
    // .pipe(livereload());
});


gulp.task('watch-js', function(){
    // livereload.listen();    
    return gulp.watch(SRC_JS, ['babelify']);
});


gulp.task('watch-css', function(){
    // livereload.listen();    
    return gulp.watch(SRC_CSS, ['stylus']);
});

gulp.task('default', ['babelify', 'stylus', 'watch-js', 'watch-css']);



