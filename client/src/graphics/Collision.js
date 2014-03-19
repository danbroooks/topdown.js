
var obj = require('obj');
var is = require('is');

var Vector = require('graphics/Vector');
var Point = require('graphics/Point');



// Constructor

var Constructor = function(vectorA, vectorB){

  if (!is.instanceOf(Vector, vectorA) || !is.instanceOf(Vector, vectorB)) {
    throw new Error('Collision constructor takes two Vector objects.');
  }

  this.vectorA = vectorA;
  this.vectorB = vectorB;

};

var collision = {};

//

collision.polygonContainsPoint = function(){};

//

collision.getIntersectionPoint = function() {

  var vectorA = this.vectorA;
  var vectorB = this.vectorB;

  var s1_x, s1_y, s2_x, s2_y;

  s1_x = vectorA.b.x - vectorA.a.x;
  s1_y = vectorA.b.y - vectorA.a.y;
  s2_x = vectorB.b.x - vectorB.a.x;
  s2_y = vectorB.b.y - vectorB.a.y;

  var s = (-s1_y * (vectorA.a.x - vectorB.a.x) + s1_x * (vectorA.a.y - vectorB.a.y)) / (-s2_x * s1_y + s1_x * s2_y);
  var t = ( s2_x * (vectorA.a.y - vectorB.a.y) - s2_y * (vectorA.a.x - vectorB.a.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    return Point({
      x: vectorA.a.x + (t * s1_x),
      y: vectorA.a.y + (t * s1_y)
    });
  }

  // No collision
  return false;
};

//

collision.doesLineIntersect = function() {
  return this.getLineIntersectionPoint() !== false;
};


// Object definition

var Collision = obj.define(Object, Constructor, collision);


module.exports = Collision;

