

// Load dependencies

var is = require('../is');
var GameConfig = require('./GameConfig');





// Object declaration

var game = {};





// Declare function arrays for initialization extension

var init = [];
var beforeInit = [];
var afterInit = [];





// Private variable for game timer

var time;





// Game configuration object

game.config = GameConfig();





//

game.init = function(){
  var execute = function(func){ func(); };
  beforeInit.forEach(execute);
  init.forEach(execute);
  afterInit.forEach(execute);

  time = Timer();
  render();
  setInterval(update, 50); // fixed update *20 a second
};





//

game.onInit = function(func){
  if (!is.Function(func)) {
    console.log("onInit only accepts functions");
    return;
  }
  init.push(func);
};





//

game.onBeforeInit = function(func) {
  if (!is.Function(func)) {
    console.log("onInit only accepts functions");
    return;
  }
  beforeInit.push(func);
};





//

game.onAfterInit = function(func) {
  if (!is.Function(func)) {
    console.log("onInit only accepts functions");
    return;
  }
  afterInit.push(func);
};





//

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





//

game.fps = function(){
  return fps.value();
};





//

game.timeElapsed = function(){
  return time.secondsElapsed();
};





//

game.render = function(delta) {};





//

var render = function() {
  fps.set(1000/time.delta());
  game.render(time.delta());
  frame++;
  requestAnimationFrame(render);
};





//

game.update = function() {};





//

var update = function() {
  game.update();
};





// Expose to browser

window.game = game;





// Expose to other internal modules

module.exports = game;

