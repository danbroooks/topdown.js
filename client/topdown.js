require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"core/Actor":[function(require,module,exports){
module.exports=require('kQeSyx');
},{}],"kQeSyx":[function(require,module,exports){


/*
 * Use this object to inherit from in your game objects.
 * Provides all the boiler plate functionality you can use to
 * call methods directly on your game objects (such as `render`).
 *
 * Note that constructors are not inherited!
 */


// Load dependencies

var obj = require('obj');
var Polygon = require('graphics/Polygon');





// Constructor

var Constructor = function(options){

  this.shape = Polygon(options);

};





// Declare object literal

var actor = {};





//

actor.move = function(x, y) {

  if (this.shape) {
    this.shape.move(x, y);
  }

};





//

actor.rotate = function(r) {

  if (this.shape) {
    this.shape.rotate(r);
  }

};





//

actor.render = function(gfx) {

  if (this.shape) {
    this.shape.render(gfx);
  }

};





//

actor.teleport = function(x, y) {

  if (this.shape) {
    this.shape.teleport(x, y);
  }

};





// Create definition

var Actor = obj.define(Object, Constructor, actor);






// Export module

module.exports = Actor;


},{"graphics/Polygon":"S3SzPy","obj":"DOFYxp"}],"core/Controls":[function(require,module,exports){
module.exports=require('g9Hroc');
},{}],"g9Hroc":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var is = require('is');
var Point = require('graphics/Point');





// key codes for onkey event

var codeFor = {
  'lshift'  : 16, 'space'  : 32,
  'up'      : 38, 'down'   : 40,
  'left'    : 37, 'right'  : 39,
  'q' : 81, 'w' : 87, 'e' : 69, 'r' : 82, 't' :  0, 'y' :  0, 'u' :  0, 'i' : 76, 'o' : 79, 'p' : 80,
  'a' : 65, 's' : 83, 'd' : 68, 'f' :  0, 'g' :  0, 'h' :  0, 'j' :  0, 'k' :  0, 'l' : 76,
  'z' : 90, 'x' : 88, 'c' : 67, 'v' :  0, 'b' :  0, 'n' :  0, 'm' :  0,
  '0' : 48, '1' : 49, '2' : 50, '3' : 51, '4' : 52,
  '5' : 53, '6' : 54, '7' : 55, '8' : 56, '9' : 57
};





// 

var Controls = function(){

  document.oncontextmenu = function() { return false; };

  var mouse = Point(0, 0);
  var onkeyup = [];
  var onkeydown = [];
  var pressed = {};

  function cycleActions(event, key) {
    for (var i = 0; i < event.length; i++) {
      if (event[i].key == key) {
        event[i].action();
      }
    }
  }

  window.onmousemove = function(e){
    mouse = Point(e.offsetX, e.offsetY);
  };

  window.onkeydown = function (key) {
    pressed[key.which] = null;
  };

  window.onkeyup = function (key) {
    cycleActions(onkeyup, key.which);
    delete pressed[key.which];
  };


  this.__defineGetter__('mouse', function(){
    return mouse;
  });

  this.on = function(key){

    if (is.String(key)) {
      key = codeFor[key];
    }

    var _on = {};

    _on.down = function(action){
      onkeydown.push({
        key: key,
        action: action
      });
      return this;
    };

    _on.up = function(action){
      onkeyup.push({
        key: key,
        action: action
      });
      return this;
    };

    return _on;
  };

  this.update = function(){
    for (var key in pressed) {
      cycleActions(onkeydown, key);
    }
  };

};





// Export module

module.exports = function(){
  return new Controls();
};

},{"graphics/Point":"07NHAF","is":"P9m7US","obj":"DOFYxp"}],"XqAouS":[function(require,module,exports){


// Load dependencies

var obj = require('obj');





// Constructor

var FPS = function(){
  var current = 0;
  var previous = 0;
  var last = 0;
  var frame = 0;

  // Returns average fps based on previous three frames

  this.value = function() {
    var v = (current + previous + last ) / 3;
    v = Math.floor(v*10)/10;
    return v;
  };

  // Counts a frame
  // TODO: this whole object could be a lot better.

  this.set = function(value) {
    frame++;
    last = previous;
    previous = current;
    current = 1000/value;
  };

  this.frame = function(){
    return frame;
  };

  this.tick = function(){
    return frame;
  };

};




// Export module

module.exports = function(filter){
  return new FPS();
};


},{"obj":"DOFYxp"}],"core/FPS":[function(require,module,exports){
module.exports=require('XqAouS');
},{}],"core/GameConfig":[function(require,module,exports){
module.exports=require('h5AJ9p');
},{}],"h5AJ9p":[function(require,module,exports){


// Load dependencies

var is = require('is');
var obj = require('obj');
var Graphics = require('graphics/Graphics');





// Constructor

var Constructor = function(){

  this.gfx = Graphics();

};





// Declare object literal

var gameConfig = {};





// Make and add canvas to canvas list

gameConfig.createCanvas = function(name) {
  this.gfx.createCanvas(name);
};

// alias

gameConfig.addCanvas = gameConfig.createCanvas;





// Primary canvas, is the active canvas in `gfx` object when game starts

gameConfig.setPrimaryCanvas = function(canvasName){
  this.gfx.setPrimaryCanvas(canvasName);
};





// Method to combine the creation and selection of a canvas

gameConfig.addPrimaryCanvas = function(name) {
  this.createCanvas(name);
  this.setPrimaryCanvas(name);
};





// Add camera

gameConfig.addCamera = function(name) {
  this.gfx.addCamera(name);
};





// Set camera

gameConfig.setCamera = function(name) {
  this.gfx.setCamera(name);
};





// Method to create and set primary camera

gameConfig.addPrimaryCamera = function(name) {
  this.addCamera(name);
  this.setCamera(name);
};





// Set up method, should create canvases in canvases array.

gameConfig.setUp = function(game) {
  if (this.setUp.hasRun) {
    console.log('gameConfig.setUp has already run.');
    return false;
  }

  game.setGraphicsObject(this.gfx);

  this.setUp.hasRun = true;
};

gameConfig.setUp.hasRun = false;





// Create definition

var GameConfig = obj.define(Object, Constructor, gameConfig);





// Export module

module.exports = GameConfig;


},{"graphics/Graphics":"mC3JHL","is":"P9m7US","obj":"DOFYxp"}],"core/Stack":[function(require,module,exports){
module.exports=require('nCd0q1');
},{}],"nCd0q1":[function(require,module,exports){


// Load dependencies

var obj = require('obj');




var Stack = function(filter){


  //
  var stack = {};
  var selected;



  this.push = function(key, value){
    if (filter(value)) {
      stack[key] = value;
    }
  };



  this.get = function(key){
    if (this.hasKey(key)) {
      return stack[key];
    }
  };



  this.select = function(select) {
    if (this.hasKey(select)) {
      selected = select;
    } else {
      console.log('Stack does not contain key ' + select + '!');
    }
  };



  this.__defineGetter__('selected', function(){
    if (stack[selected]) {
      return stack[selected];
    }
  });



  this.each = function(func) {
    obj.keys(stack).forEach(function(key, i) {
      func(stack[key]);
    });
  };



  this.hasKey = function(key) {
    return stack[key] ? true : false;
  };

};





// Export module

module.exports = function(filter){
  filter = filter || function(o){ return o; };
  return new Stack(filter);
};

},{"obj":"DOFYxp"}],"core/Timer":[function(require,module,exports){
module.exports=require('TedyOD');
},{}],"TedyOD":[function(require,module,exports){


// Load dependencies

var obj = require('obj');





// Constructor

var Constructor = function(){
  this.start = new Date().getTime();
};





// Declare object literal

var timer = {};





// Reset the timer

timer.restart = function(){
  this.start = new Date().getTime();
};





// Returns time elapsed since timer was started

timer.elapsed = function () {
  return new Date().getTime() - this.start;
};





// As above but rounded down to seconds

timer.secondsElapsed = function() {
  return Math.floor(this.elapsed()/100)/10;
};





// Length of time since delta was last called

timer.delta = function(){
  if (!this.delta.last) this.delta.last = this.start;
  var now = new Date().getTime();
  var delta = now - this.delta.last;
  this.delta.last = now;
  return delta;
};





// Create definition

var Timer = obj.define(Object, Constructor, timer);





// Static method converts string to ms

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



},{"obj":"DOFYxp"}],"core/game":[function(require,module,exports){
module.exports=require('dE1Bu5');
},{}],"dE1Bu5":[function(require,module,exports){


// Load dependencies

var is = require('is');
var GameConfig = require('core/GameConfig');
var FPS = require('core/FPS');
var Timer = require('core/Timer');
var Controls = require('core/Controls' );





// Object declaration

var game = {};





// Private variable for game config object

var gameConfig;

// Expose game configuration object with read only exposure

game.__defineGetter__('config', function(){ return gameConfig; });





// Private variable for game timer

var time;

// Expose time elapsed as readonly property

game.__defineGetter__('time', function(){ return time.secondsElapsed(); });





// Private variable for graphics object

var gfx;

// Setter method for setting private gfx variable, can only be set once.

game.setGraphicsObject = function(gfxObj) {
  if (!gfx) {
    gfx = gfxObj;
  }
};




// Framerate/FPS object

var fps = FPS();

// Expose framerate as readonly property

game.__defineGetter__('fps', function(){ return fps.value(); });

// Expose frame as readonly property

game.__defineGetter__('tick', function(){ return fps.tick(); });





// Control object

game.controls = Controls();





// Game initializer

var init = function(){
  gameConfig = GameConfig();

  game.beforeInit(gameConfig);
  gameConfig.setUp(this);
  game.afterInit(gfx);

  time = Timer();
  render();

  // Fixed interval update 20 times a second
  setInterval(update, 50);
};

// expose as readonly

game.__defineGetter__('init', function(){ return init; });





// Public methods for hooking into the main `game.init` method,
// to allow for setup routine specific to project

game.beforeInit = function() {};
game.afterInit = function() {};





// Function called every frame. `game.render` should be defined in project as
// a way to hook into the main loop

game.render = function(delta, gfx) {};

var render = function() {

  // get time since render was last called
  var delta = time.delta();

  // execute control based events.
  game.controls.update();

  // set current framerate based on that time
  fps.set(delta);

  // call project render function
  game.render(delta, gfx);

  requestAnimationFrame(render);
};





// Function called every 50ms interval. `game.update` should be defined in project as
// a way to hook into the main loop, like `game.render`

game.update = function(gfx) {};

var update = function() {
  game.update(gfx);
};





// Export module

module.exports = game;


},{"core/Controls":"g9Hroc","core/FPS":"XqAouS","core/GameConfig":"h5AJ9p","core/Timer":"TedyOD","is":"P9m7US"}],"dom":[function(require,module,exports){
module.exports=require('qkALfs');
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




// Add splice to object to allow for object to return it's selected array (like jQuery)

DOM.splice = Array.prototype.splice;




// Will generate new element based on arguments, pass a callback function to fire
// once all elements have been added.

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


},{"is":"P9m7US"}],"fn":[function(require,module,exports){
module.exports=require('AEEx6z');
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





// Executes callback at odds 1/`oneIn`, so there would be a one in three chance of
// `fn.chanceIn(3)` executing the callback.

fn.chanceIn = function (oneIn, callback) {
  if (fn.randNum(oneIn) == 1) {
    callback();
  }
};





// Picks random element from an array.

fn.fromArray = function (array) {
  var r = fn.randNum(array.length);
  return array[r];
};





// Export module

module.exports = fn;

},{}],"graphics/Camera":[function(require,module,exports){
module.exports=require('NsksZx');
},{}],"NsksZx":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var is = require('is');
var Point = require('graphics/Point');





// Constructor

var Constructor = function(x, y){

  if (!is.set(x)) {
    x = 0;
  }

  if (!is.set(y)){
    y = 0;
  }

  // Camera position stored as Point
  this.position = Point(x, y);

};





// Declare object literal

var camera = {};





// Return object literal containing position co-ordinates

camera.get = function() {
  return { x: this.position.x, y: this.position.y };
};





// Offsets a value by the X position of camera

camera.modX = function(x) {
  return x - this.position.x;
};





// Offsets a value by the Y position of camera

camera.modY = function(y) {
  return y - this.position.y;
};





// Move camera by a point

camera.move = function(point) {
  this.position.add(point);
};





// Set camera to position of a point

camera.set = function(point) {
  this.position.add(point.sub(this.position));
};





// Offsets a point by camera position, returns new point instance

camera.offset = function(point) {
  return point.add(this.position, true);
};





// Negatively offsets a point by camera position, returns new point instance

camera.noffset = function(point) {
  return point.sub(this.position, true);
};



/*

// Used for tracking an object with camera, disabled for now.

camera.track = function(object) {

   if (is.string(object) && object == 'off') {
     game.onBeforeLoop.remove('camera_track');
   }

  if (object instanceof Actor) {
    game.onBeforeLoop.add('camera_track', function(){
      camera.set(object.shape.centroid().sub(graphics.getCanvasCenter()));
    });
  }

};


*/


// Create definition

var Camera = obj.define(Object, Constructor, camera);





// Export module

module.exports = Camera;



},{"graphics/Point":"07NHAF","is":"P9m7US","obj":"DOFYxp"}],"graphics/Canvas":[function(require,module,exports){
module.exports=require('gCPbFZ');
},{}],"gCPbFZ":[function(require,module,exports){

// Load dependencies

var obj = require('obj');
var DOM = require('dom');
var Point = require('graphics/Point');
var Polygon = require('graphics/Polygon');
var Camera = require('graphics/Camera');
var Collision = require('graphics/Collision');





// Constructor

var Constructor = function(id){
  var selector = 'canvas#'+id;
  this.canvas = DOM.make(selector);
};





// Declare object literal

var canvas = {};





//

canvas.camera = undefined;





//

canvas.useCamera = function(camera){
  if (camera instanceof Camera) {
    this.camera = camera;
  }
};

canvas.setCamera = canvas.useCamera;






//

canvas.cling = function() {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
};





//

canvas.clearContext = function() {
  var canvas = this.canvas;
  var ctx = this.getContext();
  if (ctx) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
};

canvas.clear = canvas.clearContext;




//

canvas.getContext = function(){
  return this.canvas.getContext('2d');
};





//

canvas.getCanvasSize = function() {
  var canvas = this.canvas;

  return {
    w: canvas.width,
    h: canvas.height,

    width: canvas.width,
    height: canvas.height
  };
};





// Creates a polygon to represent canvas

canvas.asShape = function() {
  var size = this.getCanvasSize();
  var shape = Polygon({
    points: [
      [0, 0],
      [0, size.w],
      [size.h, size.w],
      [size.h, 0]
    ],
    position: [ size.w/2, size.h/2 ]
  });

  return shape;
};






//

canvas.getCanvasCenter = function(){
  var size = this.getCanvasSize();
  return Point([size.x/2, size.y/2]);
};





//

canvas.text = function(text, position){
  var ctx = this.getContext();
  if (ctx) {
    ctx.fillStyle = 'FFFFFF';
    ctx.fillText(text, position.x-25, position.y+5);
  }
};





// draw

canvas.drawPoints = function(points, fill, stroke) {

  // add check for 'points' containing all points?

  if (!this.pointsInShot(points)) return false;

  fill = fill || '#FFFFFF';
  stroke = stroke || '#FFFFFF';

  var ctx = this.getContext();
  var cam = this.camera;

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.beginPath();

  for(i = 0; i < points.length; i++) {
    var point = points[i];
    var func = i ? 'lineTo' : 'moveTo';
    ctx[func]( cam.modX(point.x), cam.modY(point.y) );
  }

  ctx.closePath();
  ctx.fill();
  ctx.stroke();

};

canvas.draw = canvas.drawPoints;



// Iterates over points. If at least one of a shape's points are in shot, then draw.
// If they're all less than 0 or greater than canvas edge on x or y axis, do not draw.

// TODO: re-write with 'shapes overlap' algorythm.

canvas.pointsInShot = function(points){
  var shape = this.asShape();
  // shape.move(this.camera.position);

  /*
  Collision.areaContainsPoint

  var canvas_size = this.getCanvasSize();
  var cam = this.camera;

  var viewport = {
    x:{
      lt: true, gt: true,
      min: cam.modX(0),
      max: cam.modX(canvas_size.w)
    },
    y: {
      lt: true, gt: true,
      min: cam.modY(0),
      max: cam.modY(canvas_size.h)
    }
  };

  for (var i = 0; i < points.length; i++) {
    var point = points[i];

    if(this.inShot(point)) return true;

    viewport.x.lt = ( viewport.x.lt && (point.x < viewport.x.min) ) ? true : false;
    viewport.x.gt = ( viewport.x.gt && (point.x > viewport.x.max) ) ? true : false;
    viewport.y.lt = ( viewport.y.lt && (point.y < viewport.y.min) ) ? true : false;
    viewport.y.gt = ( viewport.y.gt && (point.y > viewport.y.max) ) ? true : false;
  }

  if (viewport.x.lt || viewport.y.lt || viewport.x.gt || viewport.y.gt) return false;

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
  */
  return true;
};





canvas.inShot = function(point) {

  var canvasSize = this.getCanvasSize();
  var cam = this.camera;

  var pt = cam.noffset(point);

  var withinX = ( pt.x > 0 && pt.x < canvasSize.w);
  var withinY = ( pt.y > 0 && pt.y < canvasSize.h);

  return ( withinX && withinY );
};





// Create definition

var Canvas = obj.define(Object, Constructor, canvas);





// Export module

module.exports = Canvas;



},{"dom":"qkALfs","graphics/Camera":"NsksZx","graphics/Collision":"8SM2KA","graphics/Point":"07NHAF","graphics/Polygon":"S3SzPy","obj":"DOFYxp"}],"8SM2KA":[function(require,module,exports){

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


},{"graphics/Point":"07NHAF","graphics/Shape":"rB+uTR","graphics/Vector":"Hli4CA","is":"P9m7US","obj":"DOFYxp"}],"graphics/Collision":[function(require,module,exports){
module.exports=require('8SM2KA');
},{}],"mC3JHL":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var Stack = require('core/Stack');
var Camera = require('graphics/Camera');
var Point = require('graphics/Point');
var Canvas = require('graphics/Canvas');





// Constructor

var Constructor = function(){

  this.canvasStack = Stack(function(o){
    return o instanceof Canvas;
  });

  this.cameraStack = Stack(function(o){
    return o instanceof Camera;
  });

};





// Declare object literal

var gfx = {};





//

gfx.createCanvas = function(name) {
  if (name) {
    var c = Canvas(name);
    this.canvasStack.push(name, c);
  }
};





// Gets primary canvas

gfx.getPrimaryCanvas = function() {
  return this.canvasStack.selected;
};

gfx.getCanvas = gfx.getPrimaryCanvas;





// Sets primary canvas

gfx.setPrimaryCanvas = function(canvasName){
  this.canvasStack.select(canvasName);
};

gfx.setCanvas = gfx.setPrimaryCanvas;





// Sets camera

gfx.setCamera = function(name){
  this.cameraStack.select(name);
};





// Add camera

gfx.addCamera = function(name){
  if (name) {
    var cam = Camera();
    this.cameraStack.push(name, cam);
  }
};





// draw

gfx.draw = function(points, fill, stroke){
  this.canvasStack.selected.draw(points, fill, stroke);
};





// clears current canvas

gfx.clear = function(){
  this.canvasStack.selected.clear();
};





// prints text to current canvas

gfx.text = function(text, position){
  this.canvasStack.selected.text(text, position);
};





//

gfx.clingAll = function() {
  this.canvasStack.each(function(c){
    c.cling();
  });
};

gfx.cling = gfx.clingAll;


// // gfx.loadImage = function(src, callback) {
// //   var image = new Image();
// //   image.src = src;
// //   if (callback) {
// //     image.onload = callback;
// //   }
// //   return image;
// // };


gfx.bindCameraToCanvas = function(camera, canvas) {
  var canv = this.canvasStack.get(canvas);
  var cam = this.cameraStack.get(camera);
  if (canv && cam) {
    canv.useCamera(cam);
  }
};





// Create definition

var Graphics = obj.define(Object, Constructor, gfx);





// Export module

module.exports = Graphics;


},{"core/Stack":"nCd0q1","graphics/Camera":"NsksZx","graphics/Canvas":"gCPbFZ","graphics/Point":"07NHAF","obj":"DOFYxp"}],"graphics/Graphics":[function(require,module,exports){
module.exports=require('mC3JHL');
},{}],"07NHAF":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var is = require('is');





// Constructor

var Constructor = function(x, y){

  if (!is.set(x)) {
    this.x = 0;
    this.y = 0;
  } else if (!is.set(y) && is.Array(x) && x.length == 2) {
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

},{"is":"P9m7US","obj":"DOFYxp"}],"graphics/Point":[function(require,module,exports){
module.exports=require('07NHAF');
},{}],"graphics/Polygon":[function(require,module,exports){
module.exports=require('S3SzPy');
},{}],"S3SzPy":[function(require,module,exports){


// Load dependencies

var obj = require('obj');
var is = require('is');

var Shape = require('graphics/Shape');
var Point = require('graphics/Point');





// Constructor

var Constructor = function(options) {

  var points;
  var position;
  var opts = {};

  function validateRawArray(points) {
    var size = 2;
    points.forEach(function(point){
      if (point.length != size) throw new Error('Array contains incorrect number of values to make a point ('+size+').');
    });
    return true;
  }

  function arrayOfPoints(points) {
    var allPoints = true;
    points.forEach(function(point){
      var isPoint = point instanceof Point;
      if (allPoints && !isPoint ) {
        allPoints = false;
      }
    });
    return allPoints;
  }

  if (is.Array(options)) {
    points = options;
  } else if (is.set(options.points)) {
    points = options.points;
  }

  if (is.Array(points)) {
    var tmp;
    if (!arrayOfPoints(points)) {
      validateRawArray(points);
      tmp = [];
      points.forEach(function(opt){
        tmp.push(Point(opt));
      });
    } else {
      tmp = points;
    }

    opts.points = tmp;
  }

  // TODO: convert options.position to Point object if array of 2 values

  options = obj.extend({
    points: [
      Point( 20, 20 ),
      Point( 20, 40 ),
      Point( 40, 40 ),
      Point( 40, 20 )
    ]
  }, options, opts);

  this.points = options.points;

  options = obj.extend({
    position: this.centroid()
  }, options, opts);

  var pos = options.position;

  if (is.Array(pos)) {
    pos = Point(pos);
  }

  this.move(this.centroid().invert());
  this.move(pos);

  this.position = this.centroid();

};





// Declare object literal

var polygon = {};





// Calls graphics method to render shape

polygon.render = function (gfx) {
  gfx.getCanvas().draw(this.points);
};





// Iterates over points to move them by vector supplied in argument

polygon.move = function () {
  var args = arguments;
  var vector;

  if (!args.length || args.length > 2) {
    return false;
  } else if (args[0] instanceof Point) {
    vector = args[0];
  } else if (args.length == 2) {
    if( isNaN( args[0] ) || isNaN( args[1] ) ) {
      return false;
    }
    vector = Point(args[0], args[1]);
  }

  if (false === vector instanceof Point) {
    throw new Error('You can only move a point by the vector of another Point.');
  }

  this.points.forEach(function(point){
    point.add(vector);
  });

  this.position = this.centroid();
};





// TODO: basically just alias of move ?

polygon.teleport = function (x, y) {
  var point;

  if (x instanceof Point) {
    point = x;
  } else {
    point = Point(x, y);
  }

  var current = this.centroid();
  this.move(point.sub(current));
};





// Iterates over points to rotate them by angle supplied in argument

polygon.rotate = function (theta) {
  var axis = this.position;

  this.points.forEach(function(point){
    point.rotate(axis, theta);
  });

  angle = (this.angle + theta) % (Math.PI*2);

  while(angle < 0) angle += (Math.PI*2);

  this.angle = angle;
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
  return false;
};

polygon.pointInPolygon = polygon.containsPoint;





//

polygon.detectCollision = function () {

  // TODO: re-write using Collision object
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





// Returns the center point of shape.

polygon.centroid = function() {

  var pts  = this.points;
  var nPts = pts.length;


  if (nPts < 3) {
    // TODO: doesnt calculate with only two points (ie straight line)
    throw Error('Centroid for two point shape not implemented yet.');
  } else {
    var x = 0;
    var y = 0;
    var j = nPts - 1;
    var f, p1, p2;

    for (var i = 0; i < nPts; j = i++) {
      p1 = pts[i];
      p2 = pts[j];
      f  = p1.x * p2.y - p2.x * p1.y;
      x += (p1.x + p2.x) * f;
      y += (p1.y + p2.y) * f;
    }

    f = this.area() * 6;

    return Point([ x/f, y/f ]);
  }
};





// Returns area of shape

polygon.area = function() {
  var p1, p2;
  var area = 0;
  var pts = this.points;

  for (var i=0, nPts = pts.length, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    area += p1.x * p2.y;
    area -= p1.y * p2.x;
  }

  area /= 2;

  return area;
};





// Object definition

var Polygon = obj.define(Shape, Constructor, polygon);





// Expose to other internal modules

module.exports = Polygon;


},{"graphics/Point":"07NHAF","graphics/Shape":"rB+uTR","is":"P9m7US","obj":"DOFYxp"}],"graphics/Shape":[function(require,module,exports){
module.exports=require('rB+uTR');
},{}],"rB+uTR":[function(require,module,exports){


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

},{"obj":"DOFYxp"}],"Hli4CA":[function(require,module,exports){


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
},{"graphics/Point":"07NHAF","is":"P9m7US","obj":"DOFYxp"}],"graphics/Vector":[function(require,module,exports){
module.exports=require('Hli4CA');
},{}],"HKUJiZ":[function(require,module,exports){

},{}],"graphics/trig":[function(require,module,exports){
module.exports=require('HKUJiZ');
},{}],"is":[function(require,module,exports){
module.exports=require('P9m7US');
},{}],"P9m7US":[function(require,module,exports){


// Object declaration

var is = {};





//

is.instanceOf = function(type, instance) {
  return ( false !== instance instanceof type );
};





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

is.Set = function () {
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

is.set = is.Set;





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
    console.log('one');
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !is.Function(target)) {
    console.log('two');
    target = {};
  }
  if (length === i) {
    console.log('three');
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

  if (seed >= m) {
    seed = m-1;
  } else {
    seed = ( (seed < 0) ? Math.abs(seed) : seed );
  }

  // Invert all even seeds.
  if (seed % 2) {
    seed = m-seed;
  }

  chunk = (seed % 16);
  chunk = Math.abs( (chunk % 2 ? 7 : 0) + Math.floor(chunk / 2) );
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

},{"is":"P9m7US"}],"+KSpms":[function(require,module,exports){


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

},{"core/game":"dE1Bu5","dom":"qkALfs"}],"onload":[function(require,module,exports){
module.exports=require('+KSpms');
},{}],"poly":[function(require,module,exports){
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

},{}]},{},["vARtDh","+KSpms","AEEx6z","P9m7US","DOFYxp","qkALfs","kQeSyx","TedyOD","nCd0q1","XqAouS","dE1Bu5","h5AJ9p","HKUJiZ","Hli4CA","07NHAF","8SM2KA","rB+uTR","S3SzPy","NsksZx","gCPbFZ","mC3JHL"])