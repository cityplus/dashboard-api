/**
 * Build automation
 */

const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const tagVersion = require('gulp-tag-version');
const filter = require('gulp-filter');
const mkdirp = require('mkdirp');
const path = require('path');
const Async = require('async');
const copy = require('copy');
const rmDir = require('rimraf');

const paths = {
    'api/**/*': 'api',
    'bin/**/*': 'bin',
    'controllers/**/*': 'controllers',
    'middlewares/**/*': 'middlewares',
    'models/**/*': 'models',
    'public/**/*': 'public',
    'services/**/*': 'services',
    'views/**/*': 'views',
    'app.js': '.',
    'package*.json': '.'
};


const updateVersion = (importance) => () => {

    return gulp
        .src('package.json')
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Update package version'))
        .pipe(filter('package.json'))
        .pipe(tagVersion());
};

gulp.task('build', done => {

    const outputDir = path.join(__dirname, "dist");

    Async.series(
        [
            // clear current dist folder if exists
            cb => rmDir(outputDir, cb),

            // make /dist
            cb => mkdirp(outputDir, (err) => cb(err)),

            // copy all required files
            cb => {

                const tasks = [];

                Object.keys(paths).map(source => {

                    tasks.push(
                        cb => ((source, dest) =>

                            Async.series(
                                [
                                    // calculate full dest path
                                    cb => {
                                        dest = path.join(outputDir, dest);

                                        cb();
                                    },

                                    // create directory
                                    cb => mkdirp(dest, cb),

                                    // copy files
                                    cb => copy(source, dest, cb)
                                ],
                                err => cb(err)
                            )

                        )(source, paths[source])
                    );
                });

                // run all copy tasks
                Async.parallel(tasks, err => cb(err));
            }
        ],
        done
    );
});

gulp.task('build:bugfix',

    gulp.series(
        'build',
        updateVersion('patch')
    )
);

gulp.task('build:feature',

    gulp.series(
        'build',
        updateVersion('minor')
    )
);