

// Load dependencies

var is = require('is');
var gameConfig = require('core/gameConfig');
var Timer = require('objects/Timer');





// Object declaration

var game = {};





// Private variable for game timer

var time;

// exposing time elapsed as readonly property

game.__defineGetter__('fps', function(){ return time.secondsElapsed(); });





// Expose game configuration object with read only exposure

game.__defineGetter__('config', function(){ return gameConfig; });






// framerate object (could be turned into module?)

var frame = 0;
var fps = {
  current: 0,
  previous: 0,
  last: 0,
  value: function() {
    var v = (this.current + this.previous + this.last ) / 3;
    v = Math.floor(v*10)/10;
    return v;
  },
  set: function(value) {
    this.last = this.previous;
    this.previous = this.current;
    this.current = value;
  }
};

// exposing framerate as readonly property

game.__defineGetter__('fps', function(){ return fps.value(); });





//

var init = function(){
  game.beforeInit();

  gameConfig.setUp();

  game.afterInit();

  time = Timer();
  render();
  setInterval(update, 50); // fixed update *20 a second
};

// expose as readonly

game.__defineGetter__('init', function(){ return init; });




// Public methods for hooking into the main game.init method.
// To allow for setup specific to project

game.beforeInit = function() {};
game.afterInit = function() {};





//

game.render = function(delta) {};

var render = function() {
  fps.set(1000/time.delta());
  game.render(time.delta());
  frame++;
  requestAnimationFrame(render);
};





//

game.update = function() {};

var update = function() {
  game.update();
};





// Expose to other internal modules

module.exports = game;

