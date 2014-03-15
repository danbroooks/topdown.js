var topdown = topdown || {};

topdown.DOM = {};

(function(){

  var is = topdown.fn.is;
  var self = topdown.DOM;

  var html5elements = ['html', 'body', 'script', 'div', 'span', 'object',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'pre', 'abbr',
    'address', 'cite', 'code', 'del', 'dfn', 'em', 'img', 'ins', 'kbd',
    'q', 'samp', 'small', 'strong', 'sub', 'sup', 'var', 'b', 'i', 'dl',
    'dt', 'dd', 'ol', 'ul', 'li', 'fieldset', 'form', 'label', 'legend',
    'table', 'caption', 'tbody', 'tfoot', 'thead', 'tr', 'th', 'td',
    'article', 'aside', 'canvas', 'details', 'figcaption', 'figure',
    'footer', 'header', 'hgroup', 'menu', 'nav', 'section', 'summary',
    'iframe', 'time', 'mark', 'audio', 'video', 'link', 'input'];

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


  var extractTag = function(tag) {
    var match = new RegExp('^([a-zA-Z]*)([#.a-zA-Z]*)+').exec(tag);
    return {
      name: match[1],
      selectors: match[2]
    };
  };

  var buildAttributes = function(attrs, selectors, multipleElements) {
    attrs = attrs || {};
    var id, classes = [];

    while((selector = new RegExp('^([#|.][a-zA-Z]+)').exec(selectors)) !== null) {
      var match = selector[0];
      selector = selector.input.replace(match, '');

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

  var isLegalElement = function(tag) {
    return is.in_array(tag, html5elements);
  };

  topdown.DOM.splice = Array.prototype.splice;

  topdown.DOM.make = function(selector, attrs, callback) {
    // currently only looks for very basic string
    var tag = extractTag(selector);

    if(!isLegalElement(tag.name)) {
      throw new Error('Illegal tag name "'+tag.name+'" passed to topdown.DOM.make');
    }

    var elements = (is.array(attrs)) ? attrs : [attrs];
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
      return self.get(appendto)[0].appendChild(e);
    }

    return append(elements, callback);
  };

  topdown.DOM.get = function(selector) {
    // a basic version of this for my own purposes:
    // http://james.padolsey.com/jquery/#v=1.7.2&fn=jQuery.fn.init
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

  topdown.DOM.on = function(action, func){
    this.each(function(e){
      e.addEventListener(action, func);
    });
    return this;
  };

  topdown.DOM.each = function(func){
    for (var i = 0; i < this.length; i++) {
      func(this[i]);
    }
    return this;
  };

  topdown.DOM.hide = function(){
    this.each(function(e){
      e.style.display = 'none';
    });
    return this;
  };

  topdown.DOM.show = function(){
    this.each(function(e){
      e.style.display = '';
    });
    return this;
  };

  topdown.DOM.first = function(){
    this.splice(1);
    return this;
  };

  topdown.DOM.html = function(value) {
    this.each(function(e){
      e.innerHTML = value;
    });
    return this;
  };

  topdown.DOM.attr = function(attr, value) {
    this.each(function(e){
      e.setAttribute(attr, ""+value);
    });
    return this;
  };

  topdown.DOM.removeAttr = function(attr) {
    this.each(function(e){
      e.removeAttribute(attr);
    });
    return this;
  };

  topdown.DOM.css = function(property, value){
    this.each(function(e){
      var styles = e.getAttribute('style') || '';
      value += is.numeric(value) ? 'px' : '';
      e.setAttribute('style', styles + ' ' + property + ': ' + value + ';');
    });
  };

})();
