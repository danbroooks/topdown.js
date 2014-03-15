
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
      all: ['client/**/*.js']
    },
    browserify: {
      client: {
        files: {
          'public/topdown.js': [
            'client/poly.js',
            'client/fn.js',
            'client/is.js',
            'client/obj.js',
            'client/dom.js',
            'client/objects/*.js',
            'client/core/game.js',
            'client/onload.js',
            'client/graphics/trig.js',
            'client/graphics/Point.js',
            'client/graphics/Shape.js',
            'client/graphics/Polygon.js',
            'client/graphics/gfx.js',
            'client/graphics/camera.js'
          ]
        }
      }
    },
    uglify: {
      client: {
        files: {
          'public/topdown.min.js': [ 'public/topdown.js' ]
        },
        options: {
          sourceMap: true
        },
      },
    },
    watch: {
      build: {
        files: ['client/**/*.js'],
        tasks: ['jshint', 'browserify', 'uglify']
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'def', [
    'sass', 'jshint', 'browserify', 'uglify', 'watch'
  ]);

};