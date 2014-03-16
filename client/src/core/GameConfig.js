

// Load dependencies

var obj = require('../obj');
var is = require('../is');





// Object definition

var GameConfig = obj.define(Object, function(options){





// Object properties & methods

}, {





  // Canvas array & primary canvas

  canvases: [],
  primaryCanvas: undefined,





  // Set primary canvas, adds to canvases array if not already in there

  setPrimaryCanvas: function(canvas) {
    if (!is.inArray(canvas, this.canvases)) {
      this.canvases.push(canvas);
    }
    this.primaryCanvas = canvas;
  }
});





// Expose to browser

window.GameConfig = GameConfig;





// Expose to other internal modules

module.exports = GameConfig;
