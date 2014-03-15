module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        files: [{
          'client/styles.css': 'client-scss/styles.scss'
        }],
        options: {
          style: 'compressed',
          compass: true,
          cacheLocation: 'client-scss/.sass_cache'
        }
      }
    },
    jshint: {
      all: ['client-js/**/*.js']
    },
    uglify: {
      client: {
        files: {
          'client/topdown.js': [
            'client-js/fn.js',
            'client-js/dom.js',
            'client-js/onload.js',
            'client-js/game.js',
          ]
        }
      }
    },
    watch: {
      build: {
        files: ['client-js/**/*.js'],
        tasks: ['jshint', 'uglify']
      },
      styles: {
        files: ['client-scss/*.scss'],
        tasks: 'sass'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'def', [
    'sass', 'jshint', 'uglify', 'watch'
  ]);

};