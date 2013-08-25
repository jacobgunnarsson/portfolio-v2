module.exports = function(grunt) {
    var srcJs = [
        'public/js/libs/tweenmax-1.10.2.min.js',
        'public/js/libs/pxloader-1.0.0.min.js',
        'public/js/skynet.js'
    ];

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            buildJs: {
                src: srcJs,
                dest: 'public/js/skynet.selfaware.js'
            }
        },

        less: {
            buildLess: {
                options: {
                    yuicompress: false
                },
                files: {
                    'public/css/styles.css': 'public/less/styles.less'
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'css/',
                src: ['styles.css'],
                dest: 'css/',
                ext: '.min.css'
            }
        },

        uglify: {
            options: {
                mangle: true,
                compress: true,
                report: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            build: {
                files: {
                    'public/js/skynet.selfaware.min.js': 'public/js/skynet.selfaware.js'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['concat', 'uglify', 'less', 'cssmin']);

};