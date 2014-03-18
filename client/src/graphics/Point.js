

// Load dependencies

var obj = require('obj');
var is = require('is');





// Constructor

var Constructor = function(x, y){

  if (!y && is.Array(x) && x.length == 2) {
    this.x = x[0];
    this.y = x[1];
  } else if (is.PlainObject(x) && x.x && x.y) {
      this.x = x.x;
      this.y = x.y;
  } else {
    this.x = is.Numeric(x) ? x : 0;
    this.y = is.Numeric(y) ? y : 0;
  }

};





// Declare object literal

var point = {};






// Rotate point around another point

point.rotate = function (axis, theta) {

  if (false === axis instanceof Point)
    throw new Error('You can only rotate a point around another Point.');

  var cos = Math.cos(theta),
      sin = Math.sin(theta);

  var transform = {
    x: this.x - axis.x,
    y: this.y - axis.y
  };

  var rotate = {
    x: transform.x * cos - transform.y * sin,
    y: transform.x * sin + transform.y * cos
  };

  this.x = rotate.x + axis.x;
  this.y = rotate.y + axis.y;

};





// Add vector to point

point.add = function (point, returnNewInstance) {

  if (false === point instanceof Point)
    throw new Error('You can only add a another Point to Point object.');

  if (returnNewInstance) {
    var x = this.x + point.x;
    var y = this.y + point.y;
    return Point(x, y);
  } else {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

};





// Subtract vector from point

point.sub = function (point, returnNewInstance) {

  if (false === point instanceof Point)
    throw new Error('You can only subtract a another Point to Point object.');

  if (returnNewInstance) {
    var x = this.x - point.x;
    var y = this.y - point.y;
    return Point(x, y);
  } else {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

};





// Returns inverted point

point.invert = function () {
  return Point( -this.x, -this.y );
};






// Object definition

var Point = obj.define(Object, Constructor, point);






// Export module

module.exports = Point;
