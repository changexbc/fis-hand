var fis = module.exports = require('fis');

fis.cli.name = 'fis-hand';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.merge({
    statics: '/static',
    modules: {
        parser: {
            scss: 'sass',
            tmpl: 'utc'
        },
        postprocessor: {
            js: "jswrapper, require-async",
            html: "require-async"
        },
        postpackager: ['autoload', 'simple'],
        lint: {
            js: 'jshint'
        },
        spriter:'csssprites'
    },
    roadmap: {
        ext: {
            scss: 'css'
        },
        path: [{
            reg: /^\/components\/.*\.js$/i,
            isMod: true
        }, {
            reg: /^\/page\/(.*)$/i,
            useCache: false,
            release: '$1'
        }, {
            //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
            //直接引用为var $ = require('jquery');
            reg: /^\/modules\/([^\/]+)\/\1\.(js)$/i,
            //是组件化的，会被jswrapper包装
            isMod: true,
            //id为文件夹名
            id: '$1',
            release: '${statics}/$&'
        }, {
            //modules目录下的其他脚本文件
            reg: /^\/modules\/(.*)\.(js)$/i,
            //是组件化的，会被jswrapper包装
            isMod: true,
            //id是去掉modules和.js后缀中间的部分
            id: '$1',
            release: '${statics}/$&'
        }, {
            //其他css文件
            reg: /^(.*)\.(css|scss)$/i,
            useSprite: true,
            release: '${statics}/$&'
        }, {
            //前端模板
            reg: '**.tmpl',
            //当做类js文件处理，可以识别__inline, __uri等资源定位标识
            isJsLike: true,
            //只是内嵌，不用发布
            release: false
        }, {
            //内嵌html
            reg: '**.inline.html',
            //只是内嵌，不用发布
            release: false
        }, {
            reg: /^\/node_modules\/.*\.js$/i,
            release: false
        }, {
            reg: /.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)$/,
            useCache: false,
            release: '$&'
        }, {
            reg: "README.md",
            release: false
        }, {
            reg: "**",
            release: '${statics}/$&'
        }]
    },
    settings:{
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        postpackager:{
            simple:{
                autoCombine:true
            }
        },
        lint: {
            jshint: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                node: true
            }
        }
    },
    project:{
        exclude:['**/_*.scss','**.sh']
    }
});
