//var testacular = require('testacular');

/*global module:false*/
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-testacular');

  // Project configuration.
  grunt.initConfig({
    builddir: 'build',
    pkg: '<json:package.json>',
    meta: {
      banner: '/**\n' + ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' + ' */'
    },
    concat: {
      build: {
        src: ['<banner:meta.banner>', 'common/*.js'],
        dest: '<%= builddir %>/<%= pkg.name %>.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', 'common/ieshiv/*.js'],
        dest: '<%= builddir %>/<%= pkg.name %>-ieshiv.js'
      }
    },
    min: {
      build: {
        src: ['<banner:meta.banner>', '<config:concat.build.dest>'],
        dest: '<%= builddir %>/<%= pkg.name %>.min.js'
      },
      ieshiv: {
        src: ['<banner:meta.banner>', '<config:concat.ieshiv.dest>'],
        dest: '<%= builddir %>/<%= pkg.name %>-ieshiv.min.js'
      }
    },
    recess: {
      build: {
        src: ['common/**/*.less'],
        dest: '<%= builddir %>/<%= pkg.name %>.css',
        options: {
          compile: true
        }
      },
      min: {
        src: '<config:recess.build.dest>',
        dest: '<%= builddir %>/<%= pkg.name %>.min.css',
        options: {
          compress: true
        }
      }
    },
    lint: {
      files: ['grunt.js', 'common/**/*.js', 'modules/**/*.js']
    },
    watch: {
      files: ['modules/**/*.js', 'common/**/*.js', 'templates/**/*.js', 'locals/**/*.js'],
      tasks: 'build test'
    },

		// to keep the server running
		testacularServer: {
		  unit: {
		    options: {
		      keepalive: true
		    },
		    configFile: 'test/test-config.js'
		  }
		}
  });

  // Default task.
  grunt.registerTask('default', 'build test');

  grunt.registerTask('build', 'build all or some of the mgc modules', function () {

    var jsBuildFiles = grunt.config('concat.build.src');
    var lessBuildFiles = [];

    if (this.args.length > 0) {

      this.args.forEach(function(moduleName) {
        var modulejs = grunt.file.expandFiles('modules/*/' + moduleName + '/*.js');
        var moduleless = grunt.file.expandFiles('modules/*/' + moduleName + '/stylesheets/*.less', 'modules/*/' + moduleName + '/*.less');

        jsBuildFiles = jsBuildFiles.concat(modulejs);
        lessBuildFiles = lessBuildFiles.concat(moduleless);
      });

      //Set config with our new file lists
      grunt.config('builddir', 'build/custom');
      grunt.config('concat.build.src', jsBuildFiles);
      grunt.config('recess.build.src', lessBuildFiles);

    } else {
      grunt.config('concat.build.src', jsBuildFiles.concat(['modules/*/*/*.js']));
      grunt.config('recess.build.src', lessBuildFiles.concat(grunt.config('recess.build.src')));
    }

    grunt.task.run('concat min recess:build recess:min');
  });


	grunt.registerTask('server', 'run unit tests', function() {
		grunt.task.run('testacularServer');
	});

  grunt.registerTask('test', 'run tests (make sure server task is run first)', function () {
    var done = this.async();
    grunt.utils.spawn({
      cmd: process.platform === 'win32' ? 'testacular.cmd' : 'testacular',
      args: process.env.TRAVIS ? ['start', 'test/test-config.js', '--single-run', '--no-auto-watch', '--reporter=dots', '--browsers=Firefox'] : ['run']
    }, function (error, result, code) {
      if (error) {
        grunt.warn("Make sure the testacular server is online: run `grunt server`.\n" +
          "Also make sure you have a browser open to http://localhost:8080/.\n" +
          error.stdout + error.stderr);
        //the testacular runner somehow modifies the files if it errors(??).
        //this causes grunt's watch task to re-fire itself constantly,
        //unless we wait for a sec
        setTimeout(done, 1000);
      } else {
        grunt.log.write(result.stdout);
        done();
      }
    });
  });

};
