

// Load dependencies

var obj = require('obj');




var Stack = function(filter){


  //
  var stack = {};
  var selected;



  this.push = function(key, value){
    if (filter(value)) {
      stack[key] = value;
    }
  };



  this.get = function(key){
    if (this.hasKey(key)) {
      return stack[key];
    }
  };



  this.select = function(select) {
    if (this.hasKey(select)) {
      selected = select;
    } else {
      console.log('Stack does not contain key ' + select + '!');
    }
  };



  this.__defineGetter__('selected', function(){
    if (stack[selected]) {
      return stack[selected];
    }
  });



  this.each = function(func) {
    obj.keys(stack).forEach(function(key, i) {
      func(stack[key]);
    });
  };



  this.hasKey = function(key) {
    return stack[key] ? true : false;
  };

};





// Export module

module.exports = function(filter){
  filter = filter || function(o){ return o; };
  return new Stack(filter);
};
