

// Load dependencies

var obj = require('obj');
var Shape = require('graphics/Shape');





// Object definition

var Polygon = obj.define(Shape, function (options) {





  // Constructor

  options = options || {};

  function checkPoints(points, size) {
    points.forEach(function(point){
      if (point.length != size) throw new Error('Array contains incorrect amount of points required ('+size+').');
    });

    return true;
  }

/*
  var _default = {
    points: [
      [ 20, 20 ],
      [ 20, 40 ],
      [ 40, 40 ],
      [ 40, 20 ]
    ],
    position: [20, 20]
  };

  var points = ( options.points !== undefined ) ? options.points : _default.points;
  var position = ( options.position !== undefined ) ? options.position : _default.position;

  this.points = (function(){

    Points = (checkPoints(points, 2)) ? points : [];
    PointArray = [];

    Points.forEach(function(point){
      PointArray.push( Point( point ));
    });

    return PointArray;

  }());

  this.move(this.centroid().invert());
  this.move(Point(position));
  this.position = this.centroid();

  this.stroke = options.stroke || this.stroke;
  this.angle = options.angle || this.angle;
  this.fill = options.fill || this.fill;

*/





// Object properties & methods

}, {





  // Iterates over points. If at least one of a shape's points are in shot, then draw.
  // If they're all less than 0 or greater than canvas edge on x or y axis, do not draw.

  inShot: function() {
    /*
    canvas_size = topdown.gfx.getCanvasSize();

    var modx = topdown.gfx.camera.mod.x;
        mody = topdown.gfx.camera.mod.y;

    var viewport = {
      x:{
        lt: true, gt: true,
        min: modx(0),
        max: modx(canvas_size.x)
      },
      y: {
        lt: true, gt: true,
        min: mody(0),
        max: mody(canvas_size.y)
      }
    };

    for (var i = 0; i < this.points.length; i++) {
      if(this.points[i].inShot()) return true;

      var points = this.points[i];

      viewport.x.lt = ( viewport.x.lt && (points.x < viewport.x.min) ) ? true : false;
      viewport.x.gt = ( viewport.x.gt && (points.x > viewport.x.max) ) ? true : false;
      viewport.y.lt = ( viewport.y.lt && (points.y < viewport.y.min) ) ? true : false;
      viewport.y.gt = ( viewport.y.gt && (points.y > viewport.y.max) ) ? true : false;
    }

    if (viewport.x.lt || viewport.y.lt || viewport.x.gt || viewport.y.gt) return false;
    */

    // consider case when points are off shot but shape is not

    // More complex tests arise when a shape's points are out of the bounds
    // of camera, but part of the shape will still fall in shot, ie a rotated
    // square or a triangle.

    //   denom = ((LineB2.Y – LineB1.Y) * (LineA2.X – LineA1.X)) –
    //     ((LineB2.X – lineB1.X) * (LineA2.Y - LineA1.Y))
    //   return denom != 0

    // alternatively generate bounding sphere and use that to calculate wether
    // or not to draw shape, less exact but possibly more efficient.

    // http://devmag.org.za/2009/04/13/basic-collision-detection-in-2d-part-1/


    // see also:
    //   https://github.com/robhawkes/rawkets/blob/master/public/js/Game.js#L440

    // Without a final algorithm it's worth rendering this
    // content anyway incase it overlaps into the viewport.
    return true;
  },



  // Calls graphics method to render shape

  render: function () {
    /*
    if (!this.inShot()) return false;

    var
    ctx = topdown.gfx.getContext(),
    mod = topdown.gfx.camera.mod;

    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.stroke;
    ctx.beginPath();

    for(i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      var func = i ? 'lineTo' : 'moveTo';
      ctx[func](mod.x(point.x), mod.y(point.y));
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    */
  },





  // Iterates over points to move them by vector supplied in argument

  move: function () {
    /*
    var args = arguments;
    var vector;

    if(!args.length || args.length > 2) return false;
    if(args.length == 1) vector = args[0];

    if(args.length == 2) {
      if( isNaN( args[0] ) || isNaN( args[1] ) ) return false;
      vector = Point(args);
    }

    if (false === vector instanceof Point)
      throw new Error('You can only move a point by the vector of another Point.');

    this.points.forEach(function(point){
      point.add(vector);
    });

    this.position = this.centroid();

    topdown.gfx.refreshBackground = true;
    */
  },





  //

  teleport: function (point) {
    /*
    var current = this.centroid();
    this.move(point.sub(current));
    */
  },





  // Iterates over points to rotate them by angle supplied in argument

  rotate: function (theta) {
    /*
    var axis = this.position;

    this.points.forEach(function(point){
      point.rotate(axis, theta);
    });

    angle = (this.angle + theta) % (Math.PI*2);

    while(angle < 0) angle += (Math.PI*2);

    this.angle = angle;

    topdown.gfx.refreshBackground = true;
    */
  },





  //

  setAngle: function (angle) {
    /*
    var axis = this.position;
    var theta = angle - this.angle;

    this.points.forEach(function(point){
      point.rotate(axis, theta);
    });

    this.angle = angle;

    topdown.gfx.refreshBackground = true;
    */
  },





  //

  pointInPolygon: function(point){
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
  },





  // Collision algorithm

  detectCollision: function () {
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
  },





  //

  getLineIntersectionPoint: function(A1, A2, B1, B2) {
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
  },





  //

  doesLineIntersect: function(A1, A2, B1, B2) {
    return this.getLineIntersectionPoint(A1, A2, B1, B2) !== false;
  },





  // Returns the center point of shape.
  // TODO: doesnt calculate with only two points (ie straight line)

  centroid: function() {
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
  },





  // Returns area of shape

  area: function() {
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
  },

});






// Expose to other internal modules

module.exports = Polygon;

