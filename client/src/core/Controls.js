

// Load dependencies

var obj = require('obj');
var is = require('is');
var Point = require('graphics/Point');





// key codes for onkey event

var codeFor = {
  'lshift'  : 16, 'space'  : 32,
  'up'      : 38, 'down'   : 40,
  'left'    : 37, 'right'  : 39,
  'q' : 81, 'w' : 87, 'e' : 69, 'r' : 82, 't' :  0, 'y' :  0, 'u' :  0, 'i' : 76, 'o' : 79, 'p' : 80,
  'a' : 65, 's' : 83, 'd' : 68, 'f' :  0, 'g' :  0, 'h' :  0, 'j' :  0, 'k' :  0, 'l' : 76,
  'z' : 90, 'x' : 88, 'c' : 67, 'v' :  0, 'b' :  0, 'n' :  0, 'm' :  0,
  '0' : 48, '1' : 49, '2' : 50, '3' : 51, '4' : 52,
  '5' : 53, '6' : 54, '7' : 55, '8' : 56, '9' : 57
};





// 

var Controls = function(){

  document.oncontextmenu = function() { return false; };

  var mouse = Point(0, 0);
  var onkeyup = [];
  var onkeydown = [];
  var pressed = {};

  function cycleActions(event, key) {
    for (var i = 0; i < event.length; i++) {
      if (event[i].key == key) {
        event[i].action();
      }
    }
  }

  window.onmousemove = function(e){
    mouse = Point(e.offsetX, e.offsetY);
  };

  window.onkeydown = function (key) {
    pressed[key.which] = null;
  };

  window.onkeyup = function (key) {
    cycleActions(onkeyup, key.which);
    delete pressed[key.which];
  };


  this.__defineGetter__('mouse', function(){
    return mouse;
  });

  this.on = function(key){

    if (is.String(key)) {
      key = codeFor[key];
    }

    var _on = {};

    _on.down = function(action){
      onkeydown.push({
        key: key,
        action: action
      });
      return this;
    };

    _on.up = function(action){
      onkeyup.push({
        key: key,
        action: action
      });
      return this;
    };

    return _on;
  };

  this.update = function(){
    for (var key in pressed) {
      cycleActions(onkeydown, key);
    }
  };

};





// Export module

module.exports = function(){
  return new Controls();
};
