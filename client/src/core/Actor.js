

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

