

// Load dependencies

var obj = require('obj');





// Object definition

var Point = obj.define(Object, function(x, y){





  // Constructor

  var point = {};
  x = x || {};

  if (!y) {
    if (x.length == 2) {
      point.x = x[0];
      point.y = x[1];
    } else {
      point.x = x.x || 0;
      point.y = x.y || 0;
    }
  } else {
    point.x = x;
    point.y = y;
  }

  this.x = point.x;
  this.y = point.y;





// Object properties & methods

}, {





  // Rotate point around another point

  rotate: function (axis, theta) {
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
  },





  // Add vector to point

  add: function (point, returnNewInstance) {
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
  },





  // Subtract vector from point

  sub: function (point, returnNewInstance) {
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
  },





  // Returns inverted point

  invert: function () {
    return Point( -this.x, -this.y );
  },

});





// Expose to other internal modules

module.exports = Point;
