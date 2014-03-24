

// Load dependencies

var obj = require('obj');





// Constructor

var Constructor = function(){
  this.start = new Date().getTime();
};





// Declare object literal

var timer = {};





// Reset the timer

timer.restart = function(){
  this.start = new Date().getTime();
};





// Returns time elapsed since timer was started

timer.elapsed = function () {
  return new Date().getTime() - this.start;
};





// As above but rounded down to seconds

timer.secondsElapsed = function() {
  return Math.floor(this.elapsed()/100)/10;
};





// Length of time since delta was last called

timer.delta = function(){
  if (!this.delta.last) this.delta.last = this.start;
  var now = new Date().getTime();
  var delta = now - this.delta.last;
  this.delta.last = now;
  return delta;
};





// Create definition

var Timer = obj.define(Object, Constructor, timer);





// Static method converts string to ms

Timer.str2ms = function(time){
  if (typeof(time) == 'string') {
    var ms, lastChar, stripped;

    ms = time.substring(time.length - 2) == 'ms';
    lastChar = time.substring(time.length - 1);
    stripped = parseInt(time.replace(/[^0-9]/g, ''), 10);

    number = (typeof(stripped) === 'number' && !isNaN(stripped)) ? stripped : 0;

    // ms is ignored because final number is in ms anyway
    if (lastChar == 'm' && !ms) {
      time = number * 1000 * 60;
    } else if (lastChar == 's' && !ms) {
      time = number * 1000;
    } else {
      time = number;
    }

    return time;
  }
};






// Export module

module.exports = Timer;


