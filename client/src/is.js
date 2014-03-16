

// Object declaration

var is = {};





// Returns type of any object passed to it,
// more reliable implementation of typeof

is.Type = function(obj) {
  function classToType(str){
    var class2type = {
      "[object Boolean]"  : "boolean",
      "[object Number]"   : "number",
      "[object String]"   : "string",
      "[object Function]" : "function",
      "[object Array]"    : "array",
      "[object Date]"     : "date",
      "[object RegExp]"   : "regexp",
      "[object Object]"   : "object"
    };

    var type = class2type[str];
    return type ? type : false;
  }

  return obj === null ? String(obj) : classToType(({}).toString.call(obj)) || "object";
};





// Is object an array?

is.Array = Array.isArray || function(obj) {
  return is.Type(obj) === "array";
};





// Is object a function?

is.Function = function(obj){
  return is.Type(obj) === "function";
};





// Is object in array?

is.inArray = function(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
  }
  return false;
};





// Is object the window?

is.Window = function(object) {
  return object !== null && object == object.window;
};





// Is object numeric?

is.Numeric = function(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};





// You get the idea...

is.String = function(obj) {
  return is.Type(obj) == 'string';
};





// Is variable set? Same as php's `isset`

is.set = function () {
  var a = arguments,
  l = a.length,
  i = 0,
  undef;

  if (l === 0) {
    throw new Error('Empty is.set');
  }

  while (i !== l) {
    if (a[i] === undef || a[i] === null) {
      return false;
    }
    i++;
  }
  return true;
};





// Tests to see if object passed is an object, but one created as a literal,
// returns false if object was created with function constructor

is.ObjectLiteral = function(obj) {
  if (!obj || is.Type(obj) !== "object" || obj.nodeType) {
    return false;
  }
  var hasOwn = Object.prototype.hasOwnProperty;
  try {
    if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
      return false;
    }
  } catch (e) {
    return false;
  }
  var key;
  for (key in obj) {}
  return key === undefined || hasOwn.call(obj, key);
};

is.PlainObject = is.ObjectLiteral;





// Expose to other internal modules

module.exports = is;
