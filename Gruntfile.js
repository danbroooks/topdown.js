
var mod = require('./modules');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        files: [{
          'public/styles.css': 'client/styles.scss'
        }],
        options: {
          style: 'compressed',
          compass: true,
          cacheLocation: 'client/.sass_cache'
        }
      }
    },
    jshint: {
      all: ['client/src/**/*.js']
    },
    browserify: {
      client: {
        src: mod.fileList(),
        dest: 'client/topdown.js',
        options: {
          aliasMappings: {
            cwd: 'client/src',
            src: ['**/*.js']
          }
        }
      }
    },
    uglify: {
      client: {
        files: {
          'public/topdown.min.js': [ 'client/topdown.js' ]
        },
        options: {
          sourceMap: true
        },
      },
    },
    docco: {
      helpers: {
        src: [ 'client/src/*.js', 'client/src/objects/**/*.js'],
        options: {
          output: 'docs/client/helpers'
        }
      },
      core: {
        src: ['client/src/core/**/*.js'],
        options: {
          output: 'docs/client/core'
        }
      },
      graphics: {
        src: ['client/src/graphics/**/*.js'],
        options: {
          output: 'docs/client/graphics'
        }
      }
    },
    clean: ["docs/client/"],
    watch: {
      build: {
        files: ['client/**/*.js'],
        tasks: ['jshint', 'browserify', 'uglify', 'docco']
      },
      styles: {
        files: ['client/*.scss'],
        tasks: 'sass'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'def', [
    'sass', 'jshint', 'browserify', 'uglify', 'clean', 'docco', 'watch'
  ]);

};