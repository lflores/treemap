var module, require;
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cfg: {
            filename: 'treemap',
            vanillaExportName: 'TreeMap'
        },

        dirs: {
            tmp: 'tmp',
            src: 'src',
            dest: 'dist',
            docs: 'docs',
            test: 'test',
            demo: 'examples'
        },

        clean: {
            all: ['<%= dirs.dest %>/', '<%= dirs.tmp %>/'],
            tmp: ['<%= dirs.tmp %>/'],
            meteor: ['.build.*', 'versions.json']
        },

        concat: {
            vanilla: {
                src: [
					'<%= dirs.src %>/js/utils.js',
                    '<%= dirs.src %>/js/custom-tooltip.js',
					'<%= dirs.src %>/js/<%= cfg.filename %>.js'
				],
                dest: '<%= dirs.tmp %>/<%= cfg.filename %>.js'
            },
            jquery: {
                src: [
                    '<%= dirs.src %>/js/utils.js',
                    '<%= dirs.src %>/js/custom-tooltip.js',
					'<%= dirs.src %>/js/<%= cfg.filename %>.js'
				],
                dest: '<%= dirs.tmp %>/js/query.<%= cfg.filename %>.js'
            },
            angular: {
                src: [
					'<%= dirs.src %>/js/utils.js',
                    '<%= dirs.src %>/js/custom-tooltip.js',
					'<%= dirs.src %>/js/<%= cfg.filename %>.js'
				],
                dest: '<%= dirs.tmp %>/js/angular.<%= cfg.filename %>.js'
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: '/**!\n' +
                    ' * <%= pkg.name %>\n' +
                    ' * <%= pkg.description %>\n' +
                    ' *\n' +
                    ' * @license <%= pkg.license %>\n' +
                    ' * @author <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)\n' +
                    ' * @version <%= pkg.version %>\n' +
                    ' **/\n'
            },
            files: {
                src: [
					'<%= dirs.dest %>/js/<%= cfg.filename %>.js'
					//'<%= dirs.dest %>/jquery.<%= cfg.filename %>.js',
					//'<%= dirs.dest %>/angular.<%= cfg.filename %>.js'
				]
            }
        },

        uglify: {
            dist: {
                options: {
                    report: 'gzip',
                    preserveComments: 'some'
                },
                files: {
                    'dist/js/<%= cfg.filename %>.min.js': ['dist/js/<%= cfg.filename %>.js']
                        //'dist/jquery.<%= cfg.filename %>.min.js': ['dist/jquery.<%= cfg.filename %>.js'],
                        //'dist/angular.<%= cfg.filename %>.min.js': ['dist/angular.<%= cfg.filename %>.js']
                }
            }
        },

        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            scripts: {
                files: '<%= dirs.src %>/**/*.js',
                tasks: ['default'],
                options: {
                    debounceDelay: 250
                }
            },
            less: {
                files: '<%= dirs.demo %>/*.less',
                tasks: ['less'],
                options: {
                    debounceDelay: 250
                }
            },
            readme: {
                files: '<%= dirs.docs %>/**/*.md',
                tasks: ['readme'],
                options: {
                    debounceDelay: 250
                }
            }
        },

        jshint: {
            files: [
				'<%= dirs.src %>/**/*.js',
				'<%= dirs.test %>/**/*.js'
			],
            options: {}
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        less: {
            demo: {
                files: {
                    '<%= dirs.demo %>/css/treemap.css': ['<%= dirs.src %>/css/treemap.css'],
                    '<%= dirs.dest %>/css/treemap.css': ['<%= dirs.src %>/css/treemap.css']
                }
            }
        },

        umd: {
            vanilla: {
                src: '<%= dirs.tmp %>/<%= cfg.filename %>.js',
                dest: '<%= dirs.dest %>/js/<%= cfg.filename %>.js',
                objectToExport: '<%= cfg.vanillaExportName %>',
                globalAlias: '<%= cfg.vanillaExportName %>'
            },
            jquery: {
                src: '<%= dirs.tmp %>/jquery.<%= cfg.filename %>.js',
                dest: '<%= dirs.dest %>/js/jquery.<%= cfg.filename %>.js',
                deps: {
                    'default': ['$'],
                    amd: ['jquery'],
                    cjs: ['jquery'],
                    global: ['jQuery']
                }
            },
            angular: {
                src: '<%= dirs.tmp %>/angular.<%= cfg.filename %>.js',
                dest: '<%= dirs.dest %>/js/angular.<%= cfg.filename %>.js',
                deps: {
                    'default': ['angular'],
                    amd: ['angular'],
                    cjs: ['angular'],
                    global: ['angular']
                }
            }
        },

        exec: {
            'meteor-init': {
                command: ['type meteor >/dev/null 2>&1 || { curl https://install.meteor.com/ | sh; }'].join(';')
            },
            'meteor-publish': {
                command: 'meteor publish'
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: '<%= dirs.dest %>/js/',
                src: '<%= cfg.filename %>.min.js',
                dest: '<%= dirs.demo %>/js/',
            },
        },
        jasmine: {
            components: {
                src: [
                    'tests/libs/*js',
                    'dist/js/treemap.min.js'
              ],
                options: {
                    specs: 'tests/*.tests.js',
                    keepRunner: true,
                    //helpers: 'test/spec/*.js'
                }
            }
        }
    });

    // load all installed grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // task definitions
    grunt.registerTask('default', [
		'clean:all',
		'jshint',
		'concat',
		'umd:vanilla',
		'usebanner',
		'uglify',
		//'clean:tmp',
		'readme', 'less', "copy"
	]);

    grunt.registerTask('test', ['karma:unit']);
    grunt.registerTask('all', ['default', 'less']);
    grunt.registerTask('meteor-publish', ['exec:meteor-init', 'exec:meteor-publish', 'exec:meteor-cleanup']);
    grunt.registerTask('meteor', ['exec:meteor-init', 'exec:meteor-publish', 'exec:meteor-cleanup']);
    grunt.registerTask('travis', [
        'jshint', 'jasmine'
    ]);
};
