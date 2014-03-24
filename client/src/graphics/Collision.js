
var obj = require('obj');
var is = require('is');

var Shape = require('graphics/Shape');
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





// Declare object literal

var collision = {};





//

collision.getIntersectionPoint = function() {

  var vectorA = this.vectorA;
  var vectorB = this.vectorB;

  var s1_x, s1_y, s2_x, s2_y;

  s1_x = vectorA.to.x - vectorA.from.x;
  s1_y = vectorA.to.y - vectorA.from.y;
  s2_x = vectorB.to.x - vectorB.from.x;
  s2_y = vectorB.to.y - vectorB.from.y;

  var s = (-s1_y * (vectorA.from.x - vectorB.from.x) + s1_x * (vectorA.from.y - vectorB.from.y)) / (-s2_x * s1_y + s1_x * s2_y);
  var t = ( s2_x * (vectorA.from.y - vectorB.from.y) - s2_y * (vectorA.from.x - vectorB.from.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    return Point({
      x: vectorA.from.x + (t * s1_x),
      y: vectorA.from.y + (t * s1_y)
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





// Static methods

Collision.areaContainsPoint = function(area, point){

  // check point is a Point
  if (! (point instanceof Point)) {
    throw Error('The point argument for areaContainsPoint should be a Point object.');
  }

  var x_inter;
  var points;

  // check area 'is shape' || 'is array of points'
  if (is.Array(area)) {
    area.forEach(function(e, i){
      if ( ! (e instanceof Point)) {
        throw Error('The area argument for areaContainsPoint should be either a Shape or an array of points');
      }
    });
    points = area;
  } else if (area instanceof Shape) {
    // if shape create an array of points.
    points = area.points;
  } else {
    throw Error('The area argument for areaContainsPoint should be either a Shape or an array of points');
  }


  var counter = 0;
  var p1 = points[0];

  for (var i = 1, l = points.length; i <= l; i++) {
    var p2 = points[i%l];

    if (
      point.y > Math.min(p1.y, p2.y) &&
      point.y <= Math.max(p1.y, p2.y) &&
      point.x <= Math.max(p1.x, p2.x) &&
      p1.y != p2.y
    ) {
      x_inter = (point.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
      if ( p1.x == p2.x || point.x <= x_inter) {
        counter++;
      }
    }
    p1 = p2;
  }

  return ( counter % 2 == 1 );
};





module.exports = Collision;

