
// Load dependencies

var obj = require('obj');
var DOM = require('dom');
var Point = require('graphics/Point');
var Shape = require('graphics/Shape');
var Camera = require('graphics/Camera');





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
  var ctx = canvas.getContext();
  if (ctx) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
};





//

canvas.getContext = function(){
  return this.canvas.getContext('2d');
};





//

canvas.getCanvasSize = function() {
  var canvas = this.canvas;
  return { x: canvas.width, y: canvas.height };
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





//

// gfx.render = function(shape) {
//   if (!shape instanceof Shape) {
//     throw new Error('Only pass shape objects to render.');
//   }

//   console.log(shape);
//   if (shape.inShot(this)) {
//     shape.render(this);
//   }

// };







// Create definition

var Canvas = obj.define(Object, Constructor, canvas);





// Export module

module.exports = Canvas;


