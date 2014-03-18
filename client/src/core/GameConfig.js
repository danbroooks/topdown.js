

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

