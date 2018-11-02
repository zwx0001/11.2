var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./src/data/data.json');
gulp.task('server', function() {
    gulp.src('./src')
        .pipe(webserver({
            port: 8888,
            livereload: true,
            directoryListing: true,
            //open: true,
            fallback: 'index.html',
            livereload: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;
                if (/^\/api/.test(req.url)) {
                    if (pathname === '/api/getData') {
                        res.end(JSON.stringify({ code: 0, data: data.data }));
                    } else {

                    }
                    res.end('请求失败!');
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
})