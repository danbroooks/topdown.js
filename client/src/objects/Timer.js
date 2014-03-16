

// Load dependencies

var obj = require('../obj');





// Object definition

var Timer = obj.define(Object, function(options){





// Object properties & methods

}, {





  //

  start: new Date().getTime(),





  //

  restart: function(){
    this.start = new Date().getTime();
  },





  //

  elapsed: function () {
    return new Date().getTime() - this.start;
  },





  //

  secondsElapsed: function() {
    return Math.floor(this.elapsed()/100)/10;
  },





  //

  lastDelta: undefined,
  delta: function(){
    if (!this.lastDelta) this.lastDelta = this.start;
    var now = new Date().getTime();
    var delta = now - this.lastDelta;
    this.lastDelta = now;
    return delta;
  },

});





// Static methods

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





// Expose to browser

window.Timer = Timer;





// Expose to other internal modules

module.exports = Timer;
