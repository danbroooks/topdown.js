

// Load dependencies

var DOM = require('dom');
var game = require('core/game');


// onload event

window.onload = function(){
  DOM.make('script', {
    src: 'script.min.js',
    type: "text/javascript"
  }, function(){
    game.init();
  });
};
