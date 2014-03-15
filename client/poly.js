

/**
 * Array forEach function polyfill
 */
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



/**
 * requestAnimationFrame polyfill
 */
var lastTime = 0;
var vendors = [ 'ms', ';', 'webkit', 'o'];

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if(!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if(!window.cancelAnimationFrame){
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}
