

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

