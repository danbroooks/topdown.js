# topdown.js

topdown.js is an engine for making topdown-view games in node.js.
It is currently in an unfinished state,
and is effectively just a small collection of client-side modules.

## Documentation

See `/docs` for docco generated documentation.

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

### v0.1.0 - First stable release

 - Create functioning game in demo repo

 - Finish documentation with 'Getting Started' guide

### v0.0.9

 - Add Audio object/module

 - Add in collision module

 - Write docs and add demo branch in `topdown-demos` for Audio & Collision

### v0.0.8

 - Add in entity management

 - Write docs and add demo branch in `topdown-demos` for Entity

### v0.0.7

 - Implement graphic object Image

 - Implement game object Requirements

 - Write docs and add demo branch in `topdown-demos` for Requirements & Image

### v0.0.6

 - Tidy current api and write documentation for it

 - Implement graphic objects Polygon & Circle

 - Write docs and add demo branch in `topdown-demos` for Polygon & Circle

