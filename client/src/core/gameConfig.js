

// Load dependencies

var is = require('is');
var DOM = require('dom');
var gfx = require('graphics/gfx');





// Object declaration

var gameConfig = {};





// Canvas array & primary canvas

var canvases = [];






// TODO: implement this method.

gameConfig.removeCanvas = function(){

};





// Primary canvas, is the active canvas in `gfx` object when game starts

var primaryCanvas;

gameConfig.__defineGetter__('primaryCanvas', function(){ return primaryCanvas; });

// Setter for primary canvas, adds to canvases array if not already in there

gameConfig.__defineSetter__('primaryCanvas', function(canvas) {
  if (!is.inArray(canvas, canvases)) {
    canvases.push(canvas);
  }
  primaryCanvas = canvas;
});





// Alias method for setting primary canvas

gameConfig.setPrimaryCanvas = function(canvas){
  gameConfig.primaryCanvas = canvas;
};






// Set up method, should create canvases in canvases array.

var hasRun = false;
gameConfig.setUp = function() {
  if (hasRun) {
    console.log('gameConfig.setUp has already run.');
    return false;
  }

  canvases.forEach(function(id){
    var selector = 'canvas#'+id;
    gfx.pushCanvas(id, DOM.make(selector));
  });

  // TODO: set primary canvas as `gfx` main canvas

  hasRun = true;
};






// Expose to other internal modules

module.exports = gameConfig;
