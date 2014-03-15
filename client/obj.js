

/**
 * Load dependencies
 */
var is = require('./is');



/**
 * object declaration
 */
var obj = {};


/**
 *
 */
obj.indexOf = function (id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id == id) return i;
  }
};



/**
 *
 */
obj.nextIdIn = function (array) {
  return array.length > 0 ? array[array.length-1].id + 1 : 1;
};




/**
 *
 */
var hasOwnProp = hasOwnProperty || Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString,
    hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
    dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ],
    dontEnumsLength = dontEnums.length;



/**
 *
 */
obj.keys = function (obj) {
  if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

  var result = [];

  for (var prop in obj) {
    if (hasOwnProp.call(obj, prop)) result.push(prop);
  }

  if (hasDontEnumBug) {
    for (var i=0; i < dontEnumsLength; i++) {
      if (hasOwnProp.call(obj, dontEnums[i])) result.push(dontEnums[i]);
    }
  }
  return result;
};



/**
 *
 */
obj.extend = function(){
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
  i = 1,
  length = arguments.length,
  deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !is.Function(target)) {
    target = {};
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (i; i < length; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep && copy && (is.PlainObject(copy) || (copyIsArray = is.Array(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && is.Array(src) ? src : [];
          } else {
            clone = src && is.PlainObject(src) ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
};



/**
 *
 */
obj.define = function (extend, initializer, methods) {
  var func, prototype = Object.create(extend && extend.prototype);

  if (methods) {
    obj.keys(methods).forEach(function (key){
      prototype[key] = methods[key];
    });
  }

  func = function () {
    var that = Object.create(prototype);
    if (typeof initializer === 'function') {
      initializer.apply(that, arguments);
    }
    return that;
  };

  obj.keys(extend).forEach(function(key){
    func[key] = extend[key];
  });

  func.prototype = prototype;
  prototype.constructor = func;
  return func;
};



/**
 *
 */
obj.identifier = function(seed){
  var m, chunk, plus, _id, mod;
  var digits = 6;

  m = 1;
  for (var d = 0; d < digits; d++) {
    m *= 16;
  }

  if (!seed && seed !== 0) {
    seed = Math.floor(Math.random()*m);
  }

  seed = (seed >= m) ? m-1 : (seed < 0) ? Math.abs(seed) : seed;

  // invert all even seeds.
  if (seed % 2) seed = m-seed;

  chunk = (seed % 16);
  chunk = Math.abs( (chunk%2?7:0) + Math.floor(chunk/2) );
  seed += m / 16 * chunk;
  seed %= m;

  mod = m/16/16;
  for (var i = 0; i < 3; i++) {
    seed += ((seed % 16)+i)*mod;
    p = 4 - i;
    seed += ((seed % 256)+(p*5))*mod;
    p %= 2;
    seed += ((seed % 16)+(p*7))*mod;
    mod /= 16;
  }

  seed %= m;

  _id = seed.toString(16);
  while(_id.length < 6){
    _id = '0'+_id;
  }

  return _id;
};



/**
 * Expose to browser
 */
window.obj = obj;



/**
 * Expose to other internal modules
 */
module.exports = obj;
