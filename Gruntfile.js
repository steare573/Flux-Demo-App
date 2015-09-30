'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    filesTest: [
      'test/**/*.test.js'
    ],

    filesGrunt: [
      'Gruntfile.js'
    ],

    filesSrc: [
      'src/**/*.js',
      'src/**/*.jsx'
    ],

    filesAll: [
      '<%= filesTest %>',
      '<%= filesGrunt %>',
      '<%= filesSrc %>',
      'src/styles/*.scss'
    ],

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'should',
          growl: true
        },
        src: ['<%= filesTest %>']
      }
    },

    env: {
      mocha: {
        NODE_ENV: 'development',
        LOGLEVEL: 'fatal'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: '<%= filesAll %>',
      test: '<%= filesTest %>',
      src: '<% = filesSrc %>',
      changedfile: []
    },

    jscs: {
      all: {
        src: '<%= filesAll %>',
        options: {
          config: '.jscsrc'
        }
      }
    },

    copy: {
      css: {
        cwd: 'components',
        src: '**/*',
        dest: 'dist/assets',
        expand: true
      },
      img: {
        cwd: 'img',
        src: '**/*',
        dest: 'dist/img',
        expand: true
      },
      index: {
        src: 'src/template/index.html',
        dest: 'dist/index.html'
      }

    },

    clean: {
      build: ['dist/assets']
    },

    browserify: {
      app: {
        src: 'src/app.jsx',
        dest: 'dist/assets/widgets-spa.js',
        options: {
          debug: true,
          extensions: ['.jsx'],
          transform: [['babelify', {loose: 'all'}]]
        }
      }
    },

    delta: {
      lint: {
        files: '<%= filesAll %>',
        tasks: ['jshint:all']
      },
      test: {
        files: ['<%= filesAll %>', ],
        //tasks: ['build', 'jshint:all'/*, 'env:mocha', 'mochaTest:test'*/]
        //tasks: ['build', 'jshint:all', 'jscs:all', 'env:mocha', 'mochaTest:test']
        tasks: ['build']
      }
    }
  });

  grunt.renameTask('watch', 'delta');

  grunt.registerTask('build', ['clean', 'browserify:app', 'copy']);
  grunt.registerTask('watch', ['delta:test']);
  grunt.registerTask('lint', ['jshint:all', 'jscs:all']);
  grunt.registerTask('test', [/*'jshint:all', 'jscs:all',*/ 'env:mocha', 'mochaTest:test']);
  grunt.registerTask('mocha', ['env:mocha', 'mochaTest:test']);

};
