

// Load dependencies

var obj = require('obj');
var is = require('is');

var Point = require('graphics/Point');


// Constructor

var Constructor = function(a, b){

  if (!is.instanceOf(Point, a) || !is.instanceOf(Point, b)) {
    throw new Error('Vector constructor takes two Point objects.');
  }

  this.a = a;
  this.b = b;

};





// Declare object literal

var vector = {};






//

vector.test = function () {

  console.log(this.a);
  console.log(this.b);

};





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