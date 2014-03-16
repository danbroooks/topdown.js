require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"core/game":[function(require,module,exports){
module.exports=require('dE1Bu5');
},{}],"dE1Bu5":[function(require,module,exports){


// Load dependencies

var is = require('is');
var gameConfig = require('core/gameConfig');
var Timer = require('objects/Timer');





// Object declaration

var game = {};





// Private variable for game timer

var time;

// exposing time elapsed as readonly property

game.__defineGetter__('fps', function(){ return time.secondsElapsed(); });





// Expose game configuration object with read only exposure

game.__defineGetter__('config', function(){ return gameConfig; });






// framerate object (could be turned into module?)

var frame = 0;
var fps = {
  current: 0,
  previous: 0,
  last: 0,
  value: function() {
    var v = (this.current + this.previous + this.last ) / 3;
    v = Math.floor(v*10)/10;
    return v;
  },
  set: function(value) {
    this.last = this.previous;
    this.previous = this.current;
    this.current = value;
  }
};

// exposing framerate as readonly property

game.__defineGetter__('fps', function(){ return fps.value(); });





//

var init = function(){
  game.beforeInit();

  gameConfig.setUp();

  game.afterInit();

  time = Timer();
  render();
  setInterval(update, 50); // fixed update *20 a second
};

// expose as readonly

game.__defineGetter__('init', function(){ return init; });




// Public methods for hooking into the main game.init method.
// To allow for setup specific to project

game.beforeInit = function() {};
game.afterInit = function() {};





//

game.render = function(delta) {};

var render = function() {
  fps.set(1000/time.delta());
  game.render(time.delta());
  frame++;
  requestAnimationFrame(render);
};





//

game.update = function() {};

var update = function() {
  game.update();
};





// Expose to other internal modules

module.exports = game;


},{"core/gameConfig":"/JRJU7","is":"P9m7US","objects/Timer":"y3F4VZ"}],"/JRJU7":[function(require,module,exports){


// Load dependencies

var is = require('is');
var DOM = require('dom');
var gfx = require('graphics/gfx');





// Object declaration

var gameConfig = {};





// Canvas array & primary canvas

var canvases = [];






// TODO: write this method.

gameConfig.removeCanvas = function(){

};





//

var primaryCanvas;

gameConfig.__defineGetter__('primaryCanvas', function(){ return primaryCanvas; });

// Setter for primary canvas, adds to canvases array if not already in there

gameConfig.__defineSetter__('primaryCanvas', function(canvas) {
  if (!is.inArray(canvas, canvases)) {
    canvases.push(canvas);
  }
  primaryCanvas = canvas;
});





// Alias method for setting primary canvas

gameConfig.setPrimaryCanvas = function(canvas){
  gameConfig.primaryCanvas = canvas;
};






// Set up method, should create canvases in canvases array.

var hasRun = false;
gameConfig.setUp = function() {
  if (hasRun) {
    console.log('gameConfig.setUp has already run.');
    return false;
  }

  canvases.forEach(function(id){
    var selector = 'canvas#'+id;
    gfx.pushCanvas(id, DOM.make(selector));
  });

  hasRun = true;
};






// Expose to other internal modules

module.exports = gameConfig;

},{"dom":"qkALfs","graphics/gfx":"fc2DQ5","is":"P9m7US"}],"core/gameConfig":[function(require,module,exports){
module.exports=require('/JRJU7');
},{}],"qkALfs":[function(require,module,exports){


// Load dependencies

var is = require('is');




// Declare object

var DOM = {};




// Array of elements, to check if a string represents a html tag
// in `isLegalElement`

var html5elements = ['html', 'body', 'script', 'div', 'span', 'object',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre', 'abbr',
  'address', 'cite', 'code', 'del', 'dfn', 'em', 'img', 'ins', 'kbd',
  'q', 'samp', 'small', 'strong', 'sub', 'sup', 'var', 'b', 'i', 'dl',
  'dt', 'dd', 'ol', 'ul', 'li', 'fieldset', 'form', 'label', 'legend',
  'table', 'caption', 'tbody', 'tfoot', 'thead', 'tr', 'th', 'td',
  'article', 'aside', 'canvas', 'details', 'figcaption', 'figure',
  'footer', 'header', 'hgroup', 'menu', 'nav', 'section', 'summary',
  'iframe', 'time', 'mark', 'audio', 'video', 'link', 'input'];

var isLegalElement = function(tag) {
  return is.inArray(tag, html5elements);
};




// Audio support detection, not currently exported.
// (may be moved to own module in future)

var audioSupport = {
  mp3: false,
  ogg: false
};

(function(){
  var audio = document.createElement('audio');
  if (audio.canPlayType) {
    audioSupport.mp3 = "" !== audio.canPlayType('audio/mpeg');
    audioSupport.ogg = "" !== audio.canPlayType('audio/ogg; codecs="vorbis"');
  }
})();




// Private helper function, used in `make`

var extractTag = function(tag) {
  var match = new RegExp(/^([a-zA-Z]*)([#.\-a-zA-Z]*)/).exec(tag);
  return {
    name: match[1],
    selectors: match[2]
  };
};




// Private helper function, also used in `make`

var buildAttributes = function(attrs, selectors, multipleElements) {
  attrs = attrs || {};
  var id, classes = [];

  while((selectors = new RegExp(/^([#|.][\-a-zA-Z]+)/).exec(selectors)) !== null) {
    var match = selectors[0];
    selectors = selectors.input.replace(match, '');

    if (match.charAt(0) == "#") {
      if (multipleElements) {
        console.log('An id should be unique to one element!');
      } else if (!id) {
        id = match.substring(1);
      } else {
        console.log('An element should only have a maximum of one id!');
      }
    } else if (match.charAt(0) == ".") {
      classes.push(match.substring(1));
    }
  }

  return {
    id: id,
    classes: classes
  };
};




//

DOM.splice = Array.prototype.splice;




// Currently only looks for very basic string

DOM.make = function(selector, attrs, callback) {
  var tag = extractTag(selector);
  attrs = attrs || {};

  if(!isLegalElement(tag.name)) {
    throw new Error('Illegal tag name "'+tag.name+'" passed to topdown.DOM.make');
  }

  var elements = (is.Array(attrs)) ? attrs : [attrs];
  var multipleElements = elements.length > 1;
  callback = callback || function(){};
  attrs = buildAttributes(attrs, tag.selectors, multipleElements);
  var id = attrs.id;
  var classes = attrs.classes;

  function append(array, callback) {
    var properties = array[0],
        e = document.createElement(tag.name),
        appendto;

    if (properties.appendto){
      appendto = properties.appendto;
      delete properties.appendto;
    }

    for (var att in properties) {
      if (properties.hasOwnProperty(att)) {
        e.setAttribute(att, properties[att]);
      }
    }

    e.onload = e.onreadystatechange = function(e){
      array.shift();
      if(array.length) {
        append(array, callback);
      } else {
        callback();
      }
    };

    if (id) e.id = id;
    for ( var n = 0, file; ($class = classes[n]); n++ ) {
      e.classList.add($class);
    }

    appendto = appendto || 'body';
    return DOM.get(appendto)[0].appendChild(e);
  }

  return append(elements, callback);
};




// A very basic jQuery style element selector

DOM.get = function(selector) {
  var target;
  var selected = [];
  if (selector) {
    if(typeof(selector) === "string") {
      if(selector.charAt(0) === "#") {
        target = selector.slice(1);
        var id = document.getElementById(target);
        selected = id ? [id] : [];
      } else if(selector.charAt(0) === ".") {
        target = selector.slice(1);
        selected = document.getElementsByClassName(target);
      } else {
        selected = document.getElementsByTagName(selector);
      }
    }
  }

  this.splice(0);
  Array.prototype.push.apply( this, selected );
  return this;
};




// Loop through all selected elements and apply function to each

DOM.each = function(func){
  for (var i = 0; i < this.length; i++) {
    func(this[i]);
  }
  return this;
};




// Add event listener to all selected elements

DOM.on = function(action, func){
  DOM.each(function(e){
    e.addEventListener(action, func);
  });
  return this;
};




// Hides all selected elements with display:none

DOM.hide = function(){
  DOM.each(function(e){
    e.style.display = 'none';
  });
  return this;
};




// The reverse of previous method

DOM.show = function(){
  DOM.each(function(e){
    e.style.display = '';
  });
  return this;
};




// Return first element in selection

DOM.first = function(){
  this.splice(1);
  return this;
};




// Method for setting the content of each selected item

DOM.html = function(value) {
  DOM.each(function(e){
    e.innerHTML = value;
  });
  return this;
};




// Set attribute on all selected items

DOM.attr = function(attr, value) {
  DOM.each(function(e){
    e.setAttribute(attr, ""+value);
  });
  return this;
};




// Reverse of previous method

DOM.removeAttr = function(attr) {
  DOM.each(function(e){
    e.removeAttribute(attr);
  });
  return this;
};




// Set style property on each element

DOM.style = function(property, value){
  DOM.each(function(e){
    var styles = e.getAttribute('style') || '';
    value += is.Numeric(value) ? 'px' : '';
    e.setAttribute('style', styles + ' ' + property + ': ' + value + ';');
  });
};

// Alias for style

DOM.css = DOM.style;



// Export module

module.exports = DOM;


},{"is":"P9m7US"}],"dom":[function(require,module,exports){
module.exports=require('qkALfs');
},{}],"AEEx6z":[function(require,module,exports){


// Object declaration

var fn = {};





// Function for wrapping a constantly incrementing number around another number.
// For example `fn.wrap(7, 4)` returns 3, `fn.wrap(8, 4)` returns 0,
// `fn.wrap(9, 4)` returns 1, and so on.

fn.wrap = function(number, wrap) {
  return ((number % wrap) + wrap) % wrap;
};





// Returns a random number between 1 and `max`

fn.randNum = function (max) {
  return (Math.ceil(Math.random() * max) % max) + 1;
};





// Returns true at odds 1/`oneIn`, so there would be a one in three chance of
// `fn.chanceIn(3)` returning true. Could do with some better names here.

fn.chanceIn = function (oneIn) {
  return fn.randNum(oneIn) == 1 ? false : true;
};





// Picks random element from an array.

fn.fromArray = function (array) {
  var r = fn.randNum(array.length);
  return array[r];
};





// Export module

module.exports = fn;

},{}],"fn":[function(require,module,exports){
module.exports=require('AEEx6z');
},{}],"graphics/Point":[function(require,module,exports){
module.exports=require('07NHAF');
},{}],"07NHAF":[function(require,module,exports){


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

},{"obj":"DOFYxp"}],"S3SzPy":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var Shape = require('graphics/Shape');





// Object definition

var Polygon = obj.define(Shape, function (options) {





  // Constructor

  options = options || {};
/*
  function checkPoints(points, size) {
    points.forEach(function(point){
      if (point.length != size) throw new Error('Array contains incorrect amount of points required ('+size+').');
    });

    return true;
  }

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


},{"graphics/Shape":"rB+uTR","obj":"DOFYxp"}],"graphics/Polygon":[function(require,module,exports){
module.exports=require('S3SzPy');
},{}],"graphics/Shape":[function(require,module,exports){
module.exports=require('rB+uTR');
},{}],"rB+uTR":[function(require,module,exports){


// Load dependencies

var obj = require('obj');





// Object definition

var Shape = obj.define(Object, function (options) {





  // Constructor

  throw new Error("This class isn't meant for direct instantiation");





// Object properties & methods

}, {





  //

  stroke: '698796',
  fill: '132132',
  angle: Math.PI*2,





  //

  inShot: function(){
    return false;
  },





  //

  render: function(){}

});





// Expose to other internal modules

module.exports = Shape;

},{"obj":"DOFYxp"}],"k68hkO":[function(require,module,exports){


// Load dependencies

var gfx = require('graphics/gfx');
var Point = require('graphics/Point');





// Object declaration

var camera = {};





// Camera position stored as Point

var position = Point([0,0]);





//

camera.get = function() {
  return { x: position.x, y: position.y };
};





//

camera.modX = function(x) {
  return x - position.x;
};





//

camera.modY = function(y) {
  return y - position.y;
};





//

camera.move = function(point) {
  position.add(point);
};





//

camera.set = function(point) {
  position.add(point.sub(position));
};





//

camera.offset = function(point) {
  return point.add(position, true);
};





//

camera.noffset = function(point) {
  return point.sub(position, true);
};





// Returns true if point is inside camera

camera.pointInShot = function (point) {
  /*
  var cam = {
    x: camera.modX(point.x),
    y: camera.modY(point.y)
  };
  */
  var cam = camera.noffset(point);

  var canvas = gfx.getCanvasSize();

  if ( cam.x < 0 || cam.x > canvas.x || cam.y < 0 || cam.y > canvas.y ) {
    return false;
  }
  return true;
};





//

camera.track = function(object) {
  /*
   if (is.string(object) && object == 'off') {
     game.onBeforeLoop.remove('camera_track');
   }

  if (object instanceof Actor) {
    game.onBeforeLoop.add('camera_track', function(){
      camera.set(object.shape.centroid().sub(graphics.getCanvasCenter()));
    });
  }
  */
};





// Expose to other internal modules

module.exports = camera;


},{"graphics/Point":"07NHAF","graphics/gfx":"fc2DQ5"}],"graphics/camera":[function(require,module,exports){
module.exports=require('k68hkO');
},{}],"fc2DQ5":[function(require,module,exports){


// Load dependencies

var is = require('is');
var Point = require('graphics/Point');





// Object declaration

var gfx = {};





//

var canvas, context, ctx;
var canvasStack = {};





//

gfx.pushCanvas = function(name, element) {
  canvasStack[name] = element;
};





//

gfx.setCanvas = function(name){
  canvas = name ? canvasStack[name] : canvas;
  ctx = context = canvas ? canvas.getContext('2d') : undefined;
};





//

gfx.cling = function(canvRef) {
  if (canvRef) {
    gfx.setCanvas(canvRef);
  }

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};





//

gfx.clearContext = function(ctxRef) {
  ctxRef = ctxRef || context;
  if (ctxRef) {
    ctxRef.clearRect(0,0,canvas.width,canvas.height);
  }
};





//

gfx.getContext = function(){
  return context;
};





//

gfx.getCanvasSize = function() {
  if (canvas) {
    return { x: canvas.width, y: canvas.height };
  }
};





//

gfx.getCanvasCenter = function(){
  if (canvas) {
    var size = gfx.getCanvasSize();
    return Point([size.x/2, size.y/2]);
  }
};





//

gfx.render = function(shape) {
/*
  if (!shape instanceof Shape) {
    throw new Error('Only pass shape objects to render.');
  }

  if (shape.inShot()) {
    shape.render();
  }
*/
};





//

gfx.loadImage = function(src, callback) {
  var image = new Image();
  image.src = src;
  if (callback) {
    image.onload = callback;
  }
  return image;
};





//

gfx.text = function(text, position){
  context.fillStyle = 'FFFFFF';
  context.fillText(text, position.x-25, position.y+5);
};





//

gfx.refresh = true;






// Expose to other internal modules

module.exports = gfx;

},{"graphics/Point":"07NHAF","is":"P9m7US"}],"graphics/gfx":[function(require,module,exports){
module.exports=require('fc2DQ5');
},{}],"graphics/trig":[function(require,module,exports){
module.exports=require('HKUJiZ');
},{}],"HKUJiZ":[function(require,module,exports){

},{}],"is":[function(require,module,exports){
module.exports=require('P9m7US');
},{}],"P9m7US":[function(require,module,exports){


// Object declaration

var is = {};





// Returns type of any object passed to it,
// more reliable implementation of typeof

is.Type = function(obj) {
  function classToType(str){
    var class2type = {
      "[object Boolean]"  : "boolean",
      "[object Number]"   : "number",
      "[object String]"   : "string",
      "[object Function]" : "function",
      "[object Array]"    : "array",
      "[object Date]"     : "date",
      "[object RegExp]"   : "regexp",
      "[object Object]"   : "object"
    };

    var type = class2type[str];
    return type ? type : false;
  }

  return obj === null ? String(obj) : classToType(({}).toString.call(obj)) || "object";
};





// Is object an array?

is.Array = Array.isArray || function(obj) {
  return is.Type(obj) === "array";
};





// Is object a function?

is.Function = function(obj){
  return is.Type(obj) === "function";
};





// Is object in array?

is.inArray = function(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
  }
  return false;
};





// Is object the window?

is.Window = function(object) {
  return object !== null && object == object.window;
};





// Is object numeric?

is.Numeric = function(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};





// You get the idea...

is.String = function(obj) {
  return is.Type(obj) == 'string';
};





// Is variable set? Same as php's `isset`

is.set = function () {
  var a = arguments,
  l = a.length,
  i = 0,
  undef;

  if (l === 0) {
    throw new Error('Empty is.set');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
};





// Tests to see if object passed is an object, but one created as a literal,
// returns false if object was created with function constructor

is.ObjectLiteral = function(obj) {
  if (!obj || is.Type(obj) !== "object" || obj.nodeType) {
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  try {
    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch (e) {
    return false;
  }
  var key;
  for (key in obj) {}
  return key === undefined || hasOwn.call(obj, key);
};

is.PlainObject = is.ObjectLiteral;





// Expose to other internal modules

module.exports = is;

},{}],"obj":[function(require,module,exports){
module.exports=require('DOFYxp');
},{}],"DOFYxp":[function(require,module,exports){


// Load dependencies

var is = require('is');





// Object declaration

var obj = {};




// Returns the index of an object in an array that has an id propery that matches the id argument.
// This may end up moving into entities module when that is added in future release

obj.indexOf = function (id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == id) return i;
  }
};




//

var hasOwnProp = hasOwnProperty || Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString,
    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
    dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ],
    dontEnumsLength = dontEnums.length;




// Returns an objects keys

obj.keys = function (obj) {
  if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

  var result = [];

  for (var prop in obj) {
    if (hasOwnProp.call(obj, prop)) result.push(prop);
  }

  if (hasDontEnumBug) {
    for (var i=0; i < dontEnumsLength; i++) {
      if (hasOwnProp.call(obj, dontEnums[i])) result.push(dontEnums[i]);
    }
  }
  return result;
};




// Allows extension of an object, taken from jQuery.
// Was used in early prototypes, not sure if needed any more, may remove.

obj.extend = function(){
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
  i = 1,
  length = arguments.length,
  deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !is.Function(target)) {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (i; i < length; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (is.PlainObject(copy) || (copyIsArray = is.Array(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && is.Array(src) ? src : [];
          } else {
            clone = src && is.PlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};




// A crockford pattern - useful for creating constuctors for objects,
// while supporting inheritance. Allows for instanceof checks that actually work.
// May simplify for my use as `initializer` argument is rarely used.

obj.define = function (extend, initializer, methods) {
  var func, prototype = Object.create(extend && extend.prototype);

  if (methods) {
    obj.keys(methods).forEach(function (key){
      prototype[key] = methods[key];
    });
  }

  func = function () {
    var that = Object.create(prototype);
    if (typeof initializer === 'function') {
      initializer.apply(that, arguments);
    }
    return that;
  };

  obj.keys(extend).forEach(function(key){
    func[key] = extend[key];
  });

  func.prototype = prototype;
  prototype.constructor = func;
  return func;
};




// ID generator, spits out seemingly random hex value, but if you put in the same seed number
// you'll get the same string back every time. You won't get a collision until you reach 16,777,217

obj.identifier = function(seed){
  var m, chunk, plus, _id, mod;
  var digits = 6;

  m = 1;
  for (var d = 0; d < digits; d++) {
    m *= 16;
  }

  if (!seed && seed !== 0) {
    seed = Math.floor(Math.random()*m);
  }

  seed = (seed >= m) ? m-1 : (seed < 0) ? Math.abs(seed) : seed;

  // invert all even seeds.
  if (seed % 2) seed = m-seed;

  chunk = (seed % 16);
  chunk = Math.abs( (chunk%2?7:0) + Math.floor(chunk/2) );
  seed += m / 16 * chunk;
  seed %= m;

  mod = m/16/16;
  for (var i = 0; i < 3; i++) {
    seed += ((seed % 16)+i)*mod;
    p = 4 - i;
    seed += ((seed % 256)+(p*5))*mod;
    p %= 2;
    seed += ((seed % 16)+(p*7))*mod;
    mod /= 16;
  }

  seed %= m;

  _id = seed.toString(16);
  while(_id.length < 6){
    _id = '0'+_id;
  }

  return _id;
};





// Export module

module.exports = obj;

},{"is":"P9m7US"}],"y3F4VZ":[function(require,module,exports){


// Load dependencies

var obj = require('obj');





// Object definition

var Timer = obj.define(Object, function(options){





// Object properties & methods

}, {





  //

  start: new Date().getTime(),





  //

  restart: function(){
    this.start = new Date().getTime();
  },





  //

  elapsed: function () {
    return new Date().getTime() - this.start;
  },





  //

  secondsElapsed: function() {
    return Math.floor(this.elapsed()/100)/10;
  },





  //

  lastDelta: undefined,
  delta: function(){
    if (!this.lastDelta) this.lastDelta = this.start;
    var now = new Date().getTime();
    var delta = now - this.lastDelta;
    this.lastDelta = now;
    return delta;
  },

});





// Static methods

Timer.str2ms = function(time){
  if (typeof(time) == 'string') {
    var ms, lastChar, stripped;

    ms = time.substring(time.length - 2) == 'ms';
    lastChar = time.substring(time.length - 1);
    stripped = parseInt(time.replace(/[^0-9]/g, ''), 10);

    number = (typeof(stripped) === 'number' && !isNaN(stripped)) ? stripped : 0;

    // ms is ignored because final number is in ms anyway
    if (lastChar == 'm' && !ms) {
      time = number * 1000 * 60;
    } else if (lastChar == 's' && !ms) {
      time = number * 1000;
    } else {
      time = number;
    }

    return time;
  }
};






// Export module

module.exports = Timer;

},{"obj":"DOFYxp"}],"objects/Timer":[function(require,module,exports){
module.exports=require('y3F4VZ');
},{}],"onload":[function(require,module,exports){
module.exports=require('+KSpms');
},{}],"+KSpms":[function(require,module,exports){


// Load dependencies

var DOM = require('dom');
var game = require('core/game');


// onload event

window.onload = function(){
  DOM.make('script', {
    src: 'script.min.js',
    type: "text/javascript"
  }, function(){
    game.init();
  });
};

},{"core/game":"dE1Bu5","dom":"qkALfs"}],"poly":[function(require,module,exports){
module.exports=require('vARtDh');
},{}],"vARtDh":[function(require,module,exports){


// Array forEach function polyfill

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(){
    'use strict';
    var T, k;

    if (this === null) {
      throw new TypeError("this is null or not defined");
    }

    var kValue,
        O = Object(this),
        len = O.length >>> 0; // Hack to convert O.length to a UInt32

    if ({}.toString.call(callback) !== "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    if (arguments.length >= 2) {
      T = thisArg;
    }

    k = 0;
    while (k < len) {
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}



// requestAnimationFrame polyfill

var lastTime = 0;
var vendors = [ 'ms', ';', 'webkit', 'o'];

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if(!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if(!window.cancelAnimationFrame){
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

},{}]},{},["vARtDh","+KSpms","AEEx6z","P9m7US","DOFYxp","qkALfs","y3F4VZ","dE1Bu5","/JRJU7","HKUJiZ","07NHAF","rB+uTR","S3SzPy","fc2DQ5","k68hkO"])