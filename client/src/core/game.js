

// Load dependencies

var is = require('is');
var GameConfig = require('core/GameConfig');
var Timer = require('objects/Timer');





// Object declaration

var game = {};





// Private variable for game config object

var gameConfig;






// Expose game configuration object with read only exposure

game.__defineGetter__('config', function(){ return gameConfig; });





// Private variable for game timer

var time;





// Expose time elapsed as readonly property

game.__defineGetter__('time', function(){ return time.secondsElapsed(); });





// Private variable for graphics object

var gfx;





// Setter method for setting private gfx variable, can only be set once.

game.setGraphicsObject = function(gfxObj) {
  if (!gfx) {
    gfx = gfxObj;
  }
};




// Framerate/FPS object (could be turned into module?)

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





// Expose framerate as readonly property

game.__defineGetter__('fps', function(){ return fps.value(); });





// Expose frame as readonly property

game.__defineGetter__('tick', function(){ return frame; });





// Game initializer

var init = function(){
  gameConfig = GameConfig();

  game.beforeInit(gameConfig);

  gameConfig.setUp(this);

  game.afterInit(gfx);

  time = Timer();
  render();

  // Fixed interval update 20 times a second
  setInterval(update, 50);
};





// expose as readonly

game.__defineGetter__('init', function(){ return init; });





// Public methods for hooking into the main `game.init` method,
// to allow for setup routine specific to project

game.beforeInit = function() {};
game.afterInit = function() {};





// Function called every frame. `game.render` should be defined in project as
// a way to hook into the main loop

game.render = function(delta, gfx) {};

var render = function() {

  // get time since render was last called
  var delta = time.delta();

  // set current framerate based on that time
  fps.set(1000/delta);

  // call project render function
  game.render(delta, gfx);

  frame++;
  requestAnimationFrame(render);
};





// Function called every 50ms interval. `game.update` should be defined in project as
// a way to hook into the main loop, like `game.render`

game.update = function(gfx) {};

var update = function() {
  game.update(gfx);
};





// Export module

module.exports = game;

