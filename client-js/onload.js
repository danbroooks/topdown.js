window.onload = function(){
  topdown.DOM.make('script', {
    src: 'script.js',
    type: "text/javascript"
  }, function(){
    game.init();
  });
};