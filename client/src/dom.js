

// Load dependencies

var is = require('is');




// Declare object

var DOM = {};




// Array of elements, to check if a string represents a html tag
// in `isLegalElement`

var html5elements = ['html', 'body', 'script', 'div', 'span', 'object',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre', 'abbr',
  'address', 'cite', 'code', 'del', 'dfn', 'em', 'img', 'ins', 'kbd',
  'q', 'samp', 'small', 'strong', 'sub', 'sup', 'var', 'b', 'i', 'dl',
  'dt', 'dd', 'ol', 'ul', 'li', 'fieldset', 'form', 'label', 'legend',
  'table', 'caption', 'tbody', 'tfoot', 'thead', 'tr', 'th', 'td',
  'article', 'aside', 'canvas', 'details', 'figcaption', 'figure',
  'footer', 'header', 'hgroup', 'menu', 'nav', 'section', 'summary',
  'iframe', 'time', 'mark', 'audio', 'video', 'link', 'input'];

var isLegalElement = function(tag) {
  return is.inArray(tag, html5elements);
};




// Audio support detection, not currently exported.
// (may be moved to own module in future)

var audioSupport = {
  mp3: false,
  ogg: false
};

(function(){
  var audio = document.createElement('audio');
  if (audio.canPlayType) {
    audioSupport.mp3 = "" !== audio.canPlayType('audio/mpeg');
    audioSupport.ogg = "" !== audio.canPlayType('audio/ogg; codecs="vorbis"');
  }
})();




// Private helper function, used in `make`

var extractTag = function(tag) {
  var match = new RegExp(/^([a-zA-Z]*)([#.\-a-zA-Z]*)/).exec(tag);
  return {
    name: match[1],
    selectors: match[2]
  };
};




// Private helper function, also used in `make`

var buildAttributes = function(attrs, selectors, multipleElements) {
  attrs = attrs || {};
  var id, classes = [];

  while((selectors = new RegExp(/^([#|.][\-a-zA-Z]+)/).exec(selectors)) !== null) {
    var match = selectors[0];
    selectors = selectors.input.replace(match, '');

    if (match.charAt(0) == "#") {
      if (multipleElements) {
        console.log('An id should be unique to one element!');
      } else if (!id) {
        id = match.substring(1);
      } else {
        console.log('An element should only have a maximum of one id!');
      }
    } else if (match.charAt(0) == ".") {
      classes.push(match.substring(1));
    }
  }

  return {
    id: id,
    classes: classes
  };
};




// Add splice to object to allow for object to return it's selected array (like jQuery)

DOM.splice = Array.prototype.splice;




// Will generate new element based on arguments, pass a callback function to fire
// once all elements have been added.

DOM.make = function(selector, attrs, callback) {
  var tag = extractTag(selector);
  attrs = attrs || {};

  if(!isLegalElement(tag.name)) {
    throw new Error('Illegal tag name "'+tag.name+'" passed to topdown.DOM.make');
  }

  var elements = (is.Array(attrs)) ? attrs : [attrs];
  var multipleElements = elements.length > 1;
  callback = callback || function(){};
  attrs = buildAttributes(attrs, tag.selectors, multipleElements);
  var id = attrs.id;
  var classes = attrs.classes;

  function append(array, callback) {
    var properties = array[0],
        e = document.createElement(tag.name),
        appendto;

    if (properties.appendto){
      appendto = properties.appendto;
      delete properties.appendto;
    }

    for (var att in properties) {
      if (properties.hasOwnProperty(att)) {
        e.setAttribute(att, properties[att]);
      }
    }

    e.onload = e.onreadystatechange = function(e){
      array.shift();
      if(array.length) {
        append(array, callback);
      } else {
        callback();
      }
    };

    if (id) e.id = id;
    for ( var n = 0, file; ($class = classes[n]); n++ ) {
      e.classList.add($class);
    }

    appendto = appendto || 'body';
    return DOM.get(appendto)[0].appendChild(e);
  }

  return append(elements, callback);
};




// A very basic jQuery style element selector

DOM.get = function(selector) {
  var target;
  var selected = [];
  if (selector) {
    if(typeof(selector) === "string") {
      if(selector.charAt(0) === "#") {
        target = selector.slice(1);
        var id = document.getElementById(target);
        selected = id ? [id] : [];
      } else if(selector.charAt(0) === ".") {
        target = selector.slice(1);
        selected = document.getElementsByClassName(target);
      } else {
        selected = document.getElementsByTagName(selector);
      }
    }
  }

  this.splice(0);
  Array.prototype.push.apply( this, selected );
  return this;
};




// Loop through all selected elements and apply function to each

DOM.each = function(func){
  for (var i = 0; i < this.length; i++) {
    func(this[i]);
  }
  return this;
};




// Add event listener to all selected elements

DOM.on = function(action, func){
  DOM.each(function(e){
    e.addEventListener(action, func);
  });
  return this;
};




// Hides all selected elements with display:none

DOM.hide = function(){
  DOM.each(function(e){
    e.style.display = 'none';
  });
  return this;
};




// The reverse of previous method

DOM.show = function(){
  DOM.each(function(e){
    e.style.display = '';
  });
  return this;
};




// Return first element in selection

DOM.first = function(){
  this.splice(1);
  return this;
};




// Method for setting the content of each selected item

DOM.html = function(value) {
  DOM.each(function(e){
    e.innerHTML = value;
  });
  return this;
};




// Set attribute on all selected items

DOM.attr = function(attr, value) {
  DOM.each(function(e){
    e.setAttribute(attr, ""+value);
  });
  return this;
};




// Reverse of previous method

DOM.removeAttr = function(attr) {
  DOM.each(function(e){
    e.removeAttribute(attr);
  });
  return this;
};




// Set style property on each element

DOM.style = function(property, value){
  DOM.each(function(e){
    var styles = e.getAttribute('style') || '';
    value += is.Numeric(value) ? 'px' : '';
    e.setAttribute('style', styles + ' ' + property + ': ' + value + ';');
  });
};

// Alias for style

DOM.css = DOM.style;



// Export module

module.exports = DOM;

