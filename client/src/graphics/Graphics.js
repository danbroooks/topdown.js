

// Load dependencies

var obj = require('obj');
var Stack = require('objects/Stack');
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
    var c = Camera();
    this.cameraStack.push(name, c);
  }
};




// //

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

