

// Load dependencies

var obj = require('obj');





// Constructor

var Constructor = function(){

  throw new Error("This class isn't meant for direct instantiation");

};





// Declare object literal

var shape = {};

shape.stroke = '698796';

shape.fill = '132132';

shape.angle = Math.PI*2;

shape.inShot = function(){
  return false;
};

shape.render = function(){};





// Object definition

var Shape = obj.define(Object, Constructor, shape);





// Expose to other internal modules

module.exports = Shape;
