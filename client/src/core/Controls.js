

// Load dependencies

var obj = require('obj');
var is = require('is');





// Constructor

var Constructor = function(){
  document.oncontextmenu = function() { return false; };

};





// Create definition

var controls = {};





// control codes

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





// Create definition

controls.mouse = function(){

};


window.onmousemove  = function(e){
  console.log(e);
};


controls.on = function(){
  console.log('a');
};







// Create definition

var Controls = obj.define(Object, Constructor, controls);






// Export module

module.exports = Controls;
