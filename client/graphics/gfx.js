

/**
 * Load dependencies
 */
var is = require('../is');
var Point = require('./Point');



/**
 * declare object
 */
var gfx = {};



/**
 *
 */
var canvas, context, ctx;
var canvasStack = {};



/**
 *
 */
gfx.pushCanvas = function(name, element) {
  canvasStack[name] = element;
};



/**
 *
 */
gfx.setCanvas = function(name){
  canvas = name ? canvasStack[name] : canvas;
  ctx = context = canvas ? canvas.getContext('2d') : undefined;
};



/**
 *
 */
gfx.cling = function(canvRef) {
  canvRef = canvRef || canvas;
  if (canvRef) {
    canvRef.width = window.innerWidth;
    canvRef.height = window.innerHeight;
  }
};



/**
 *
 */
gfx.clearContext = function(ctxRef) {
  ctxRef = ctxRef || context;
  if (ctxRef) {
    ctxRef.clearRect(0,0,canvas.width,canvas.height);
  }
};



/**
 *
 */
gfx.getContext = function(){
  return context;
};



/**
 *
 */
gfx.getCanvasSize = function() {
  if (canvas) {
    return { x: canvas.width, y: canvas.height };
  }
};



/**
 *
 */
gfx.getCanvasCenter = function(){
  if (canvas) {
    var size = gfx.getCanvasSize();
    return Point([size.x/2, size.y/2]);
  }
};



/**
 *
 */
gfx.render = function(shape) {
  // if (!shape instanceof Shape) {
  //   throw new Error('Only pass shape objects to render.');
  // }

  // if (shape.inShot()) {
  //   shape.render();
  // }
};



/**
 *
 */
gfx.loadImage = function(src, callback) {
  var image = new Image();
  image.src = src;
  if (callback) {
    image.onload = callback;
  }
  return image;
};



/**
 *
 */
gfx.text = function(text, position){
  context.fillStyle = 'FFFFFF';
  context.fillText(text, position.x-25, position.y+5);
};



/**
 *
 */
gfx.refresh = true;



/**
 * Expose to browser
 */
window.gfx = gfx;



/**
 * Expose to other internal modules
 */
module.exports = gfx;
