

/**
 * Load dependencies
 */
var obj = require('../obj');



/**
 * Object definition
 */
var Shape = topdown.obj.define(Object, function (options) {



  /**
   * Initializer
   */
  throw new Error("This class isn't meant for direct instantiation");



/**
 * Object properties & methods
 */
}, {



  /**
   *
   */
  stroke: '698796',
  fill: '132132',
  angle: Math.PI*2,



  /**
   *
   */
  inShot: function(){
    return false;
  },



  /**
   *
   */
  render: function(){}

});



/**
 * Exposure to other internal modules
 */
module.exports = Shape;