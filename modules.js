
var dir = 'client/src/';

var internal = [
  'poly.js',
  'onload.js'
];

var modules = [
  'fn.js',
  'is.js',
  'obj.js',
  'dom.js',
  'objects/Timer.js',
  'core/game.js',
  'core/gameConfig.js',
  'graphics/trig.js',
  'graphics/Point.js',
  'graphics/Shape.js',
  'graphics/Polygon.js',
  'graphics/gfx.js',
  'graphics/camera.js'
];

module.exports = {
  fileList: function(){
    var out = [];
    var filename;
    for(var i in internal) {
      filename = internal[i];
      out.push(dir+filename);
    }
    for(var m in modules) {
      filename = modules[m];
      out.push(dir+filename);
    }
    return out;
  },

  aliasList: function(){
    var out = [];
    for(var m in modules) {
      filename = modules[m];
      out.push(dir+filename+':'+filename.replace('.js', ''));
    }
    return out;
  },

  moduleList: function(){
    var out = [];
    for(var m in modules) {
      filename = modules[m];
      out.push(filename.replace('.js', ''));
    }
    return out;
  }
};