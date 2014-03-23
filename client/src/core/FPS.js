

// Load dependencies

var obj = require('obj');





// Constructor

var FPS = function(){
  var current = 0;
  var previous = 0;
  var last = 0;
  var frame = 0;

  // Returns average fps based on previous three frames

  this.value = function() {
    var v = (current + previous + last ) / 3;
    v = Math.floor(v*10)/10;
    return v;
  };

  // Counts a frame
  // TODO: this whole object could be a lot better.

  this.set = function(value) {
    frame++;
    last = previous;
    previous = current;
    current = 1000/value;
  };

  this.frame = function(){
    return frame;
  };

  this.tick = function(){
    return frame;
  };

};




// Export module

module.exports = function(filter){
  return new FPS();
};

