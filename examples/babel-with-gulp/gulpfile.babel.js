import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import notify from 'gulp-notify';
// 阻止 gulp 插件发生错误导致进程退出
import plumber from 'gulp-plumber';

// reload 方法引用
let reload = browserSync.reload;

// babel编译源文件
gulp.task('babel', () => {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(gulp.dest('build'));
});

// 浏览器重载 JS
gulp.task('js-watch', ['babel'], reload);

// 起一个静态服务器
gulp.task('serve', ['babel'], () => {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  // 监听文件变化
  gulp.watch("src/*.js", ['js-watch']);
  gulp.watch("*.html").on('change', reload);
});

gulp.task('default', ['serve']);
