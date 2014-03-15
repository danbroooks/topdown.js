
var topdown = topdown || {};
topdown.fn = topdown.fn || {};

topdown.fn.wrap = function(number, wrap) {
  return ((number % wrap) + wrap) % wrap;
};

topdown.fn.rand = {};

topdown.fn.rand.oneIn = function (num) {
  return (Math.ceil(Math.random() * num) % num) ? false : true;
};

topdown.fn.rand.fromArray = function (array) {
  var r = Math.floor(array.length * Math.random());
  return array[r];
};

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
