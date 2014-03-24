

// Object declaration

var fn = {};





// Function for wrapping a constantly incrementing number around another number.
// For example `fn.wrap(7, 4)` returns 3, `fn.wrap(8, 4)` returns 0,
// `fn.wrap(9, 4)` returns 1, and so on.

fn.wrap = function(number, wrap) {
  return ((number % wrap) + wrap) % wrap;
};





// Returns a random number between 1 and `max`

fn.randNum = function (max) {
  return (Math.ceil(Math.random() * max) % max) + 1;
};





// Executes callback at odds 1/`oneIn`, so there would be a one in three chance of
// `fn.chanceIn(3)` executing the callback.

fn.chanceIn = function (oneIn, callback) {
  if (fn.randNum(oneIn) == 1) {
    callback();
  }
};





// Picks random element from an array.

fn.fromArray = function (array) {
  var r = fn.randNum(array.length);
  return array[r];
};





// Export module

module.exports = fn;
