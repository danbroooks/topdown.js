

// Load dependencies

var obj = require('obj');
var Shape = require('graphics/Shape');
var Point = require('graphics/Point');





// Constructor

var Constructor = function(options){
  /*
  options = obj.extend({
    points: defaultPoints,
    position: [20, 20]
  }, options);

  var proto = this;
  while ( (proto = Object.getPrototypeOf(proto)) !== null ) {
    options = obj.extend(proto, options);
  }

  function checkPoints(points, size) {
    points.forEach(function(point){
      if (point.length != size) throw new Error('Array contains incorrect amount of points required ('+size+').');
    });

    return true;
  }

  var defaultPoints = [
    [ 20, 20 ],
    [ 20, 40 ],
    [ 40, 40 ],
    [ 40, 20 ]
  ];

  var points = options.points;
  var position = options.position;

  points = (checkPoints(points, 2)) ? points : defaultPoints;
  this.points = [];

  points.forEach(function(point){
    this.points.push( Point( point ));
  });

  this.move(this.centroid().invert());
  this.move(Point(position));
  this.position = this.centroid();
  */

};





// Declare object literal

var polygon = {};






polygon.inShot = function(gfx) {
  gfx.getCanvas().inShot(this.shape);
};





// Calls graphics method to render shape

polygon.render = function (gfx) {
  if (this.inShot()) {
    gfx.getCanvas().draw(this.shape);
  }
};





// Iterates over points to move them by vector supplied in argument

polygon.move = function () {
  /*
  var args = arguments;
  var vector;

  if (!args.length || args.length > 2) return false;
  if (args.length == 1) vector = args[0];

  if (args.length == 2) {
    if( isNaN( args[0] ) || isNaN( args[1] ) ) return false;
    vector = Point(args);
  }

  if (false === vector instanceof Point)
    throw new Error('You can only move a point by the vector of another Point.');

  this.points.forEach(function(point){
    point.add(vector);
  });

  this.position = this.centroid();
  */
};





//

polygon.teleport = function (point) {
  /*
  var current = this.centroid();
  this.move(point.sub(current));
  */
};





// Iterates over points to rotate them by angle supplied in argument

polygon.rotate = function (theta) {
  /*
  var axis = this.position;

  this.points.forEach(function(point){
    point.rotate(axis, theta);
  });

  angle = (this.angle + theta) % (Math.PI*2);

  while(angle < 0) angle += (Math.PI*2);

  this.angle = angle;
  */
};





//

polygon.setAngle = function (angle) {
  /*
  var axis = this.position;
  var theta = angle - this.angle;

  this.points.forEach(function(point){
    point.rotate(axis, theta);
  });

  this.angle = angle;
  */
};





// Move into collision module?

polygon.containsPoint = function(point){
  /*
  var
  counter = 0,
  x_inter,
  points = this.points;

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
  */
};

polygon.pointInPolygon = polygon.containsPoint;





// Collision algorithm.
// Move into collision module?

polygon.detectCollision = function () {
/*
  var args = arguments;

  if(args.length != 2) {
    throw new Error('Invalid number of arguments provided.');
  } else if ( !args[0] instanceof Point || !args[1] instanceof Point ) {
    throw new Error('Function requires two points to detect collision.');
  }

  var
  B1 = args[0],
  B2 = args[1],
  collision = false,
  points = this.points;

  if (this.pointInPolygon(B1) || this.pointInPolygon(B2)) {
    return true;
  }

  for(var i = 0, nPts = points.length; i < nPts; i++) {
    var this_point = points[i];
    var next_point = points[(i+1)%nPts];

    var A1 = {
      x: this_point.x,
      y: this_point.y
    },
    A2 = {
      x: next_point.x,
      y: next_point.y
    };

    collision = ( collision || this.doesLineIntersect(A1, A2, B1, B2) );
  }

  return collision;
*/
};





// Move into collision module?

polygon.getLineIntersectionPoint = function(A1, A2, B1, B2) {
  /*
  var s1_x, s1_y, s2_x, s2_y;
  s1_x = A2.x - A1.x;
  s1_y = A2.y - A1.y;
  s2_x = B2.x - B1.x;
  s2_y = B2.y - B1.y;
  var s, t;
  s = (-s1_y * (A1.x - B1.x) + s1_x * (A1.y - B1.y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = ( s2_x * (A1.y - B1.y) - s2_y * (A1.x - B1.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Collision detected
    return Point({
      x: A1.x + (t * s1_x),
      y: A1.y + (t * s1_y)
    });
  }

  // No collision
  return false;
  */
};





//

polygon.doesLineIntersect = function(A1, A2, B1, B2) {
  // return this.getLineIntersectionPoint(A1, A2, B1, B2) !== false;
};





// Returns the center point of shape.
// TODO: doesnt calculate with only two points (ie straight line)

polygon.centroid = function() {
  /*
  var pts  = this.points;
  var nPts = pts.length;
  var x = 0; var y = 0;
  var f;
  var j = nPts - 1;
  var p1; var p2;

  for (var i = 0; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f  = p1.x * p2.y - p2.x * p1.y;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
  }

  f = this.area() * 6;

  return Point([ x/f, y/f ]);
  */
};





// Returns area of shape

polygon.area = function() {
  /*
  var
  area = 0,
  pts = this.points,
  p1, p2;

  for (var i=0, nPts = pts.length, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }

  area /= 2;

  return area;
  */
};





// Object definition

var Polygon = obj.define(Shape, Constructor, polygon);





// Expose to other internal modules

module.exports = Polygon;

