# topdown.js

topdown.js is an engine for making topdown-view games in node.js.
It is currently in an unfinished state,
and is effectively just a small collection of client-side modules.

## Documentation

[Core](http://dangerdan.github.io/topdown.js/docs/client/core/game.html)

[Graphics](http://dangerdan.github.io/topdown.js/docs/client/graphics/Graphics.html)

[Helpers](http://dangerdan.github.io/topdown.js/docs/client/helpers/dom.html)

## Demo projects

See [topdown-demos](https://github.com/dangerdan/topdown-demos) for demo projects.

## Installation

Install packages:

    npm install topdown.js --save

Create `game.js`:

    var topdown = require('topdown');
    topdown.server.listen(80);

Then launch:

    node game.js

## Getting started

To begin making a game you need to install Grunt & Browserify.
This will be added to this readme when the process becomes more stable.

## Roadmap

### v0.0.7

 - Tidy current api and write documentation for it

 - Implement graphic objects Image, Polygon & Circle

 - Write docs and add demo branch in `topdown-demos` for new graphics objects

### v0.0.8

 - Add in entity management

 - Implement game object Requirements

 - Write docs and add demo branch in `topdown-demos` for Requirements & Entity

### v0.0.9

 - Add Audio object/module

 - Add in collision module

 - Write docs and add demo branch in `topdown-demos` for Audio & Collision

### v0.1.0 - First stable release

 - Create functioning game in demo repo

 - Finish documentation with 'Getting Started' guide

