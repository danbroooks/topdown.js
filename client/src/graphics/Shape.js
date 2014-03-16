

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
