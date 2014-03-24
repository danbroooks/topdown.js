

// Load dependencies

var obj = require('obj');
var is = require('is');
var Point = require('graphics/Point');



// Constructor

var Constructor = function(from, to){

  if (!is.instanceOf(Point, from) || !is.instanceOf(Point, to)) {
    throw new Error('Vector constructor takes two Point objects.');
  }

  this.from = from;
  this.to = to;

};





// Declare object literal

var vector = {};






// Calculate angle of vector

vector.angle = function () {

  console.log(this.a);
  console.log(this.b);

};





// Calculate distance of vector

vector.distance = function () {

  console.log(this.a);
  console.log(this.b);

};





// Object definition

var Vector = obj.define(Object, Constructor, vector);






// Export module

module.exports = Vector;