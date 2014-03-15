

/**
 * Load dependencies
 */
var dom = require('./dom');
var game = require('./core/game');



/**
 *
 */
window.onload = function(){
  DOM.make('script', {
    src: 'script.js',
    type: "text/javascript"
  }, function(){
    game.init();
  });
};
