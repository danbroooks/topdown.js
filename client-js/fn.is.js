
var topdown = topdown || {};
topdown.fn = topdown.fn || {};
topdown.fn.is = topdown.fn.is || {};

topdown.fn.is.type = function(obj) {
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

topdown.fn.is.function = function(obj){
  return this.type(obj) === "function";
};

topdown.fn.is.array = Array.isArray || function(obj) {
  return this.type(obj) === "array";
};

topdown.fn.is.in_array = function(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      if(haystack[i] == needle) return true;
  }
  return false;
};

topdown.fn.is.window = function(obj) {
  return obj !== null && obj == obj.window;
};

topdown.fn.is.numeric = function(obj) {
  return !isNaN(parseFloat(obj)) && isFinite(obj);
};

topdown.fn.is.string = function(obj) {
  return this.type(obj) == 'string';
};

topdown.fn.is.plainObject = function(obj) {
  if (!obj || this.type(obj) !== "object" || obj.nodeType) {
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

topdown.fn.is.set = function () {
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

