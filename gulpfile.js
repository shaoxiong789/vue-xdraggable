const gulp = require('gulp');
const eslint = require('gulp-eslint');
const clear = require('clear');
const {rollup} = require('rollup');
const vue = require('rollup-plugin-vue2');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const moduleName = 'VueXdraggable';
const destName = 'vue-xdraggable';
// 检测代码风格
gulp.task('lint', () => {
    clear();
    return gulp.src(['src/**/*.js', 'src/**/*.vue', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
// 编译开发版本
gulp.task('build:dev', ['lint'], () => {
    return rollup({
        entry: 'src/index.js',
        plugins: [vue(), babel()],
        external: ['vue-xdraggable']
    })
    .then((bundle) => {
        bundle.write({
            moduleName,
            format: 'umd',
            dest: `dist/${destName}.js`,
            sourceMap: true,
            globals: {
                'vue-xdraggable': 'VueXdraggable'
            }
        });
    });
});

// 编译生产版本
gulp.task('build:prod', ['lint'], () => {
    return rollup({
        entry: 'src/index.js',
        plugins: [vue(), babel(), uglify()],
        external: ['vue-xdraggable']
    })
    .then((bundle) => {
        bundle.write({
            moduleName,
            format: 'umd',
            dest: `dist/${destName}.min.js`,
            sourceMap: true,
            globals: {
                'vue-xdraggable': 'VueXdraggable'
            }
        });
    });
});

gulp.task('default', ['lint', 'build:dev', 'build:prod']);
