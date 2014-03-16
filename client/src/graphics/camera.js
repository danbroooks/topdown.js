

// Load dependencies

var gfx = require('graphics/gfx');
var Point = require('graphics/Point');





// Object declaration

var camera = {};





// Camera position stored as Point

var position = Point([0,0]);





// Return object literal with position co-ordinates

camera.get = function() {
  return { x: position.x, y: position.y };
};





// Offsets a value by the X position of camera

camera.modX = function(x) {
  return x - position.x;
};





// Offsets a value by the Y position of camera

camera.modY = function(y) {
  return y - position.y;
};





// Move camera by a point

camera.move = function(point) {
  position.add(point);
};





// Set camera to position of a point

camera.set = function(point) {
  position.add(point.sub(position));
};





// Offsets a point by camera position, returns new point instance

camera.offset = function(point) {
  return point.add(position, true);
};





// Negatively offsets a point by camera position, returns new point instance

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





// Used for tracking an object with camera, disabled for now.

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





// Export module

module.exports = camera;

