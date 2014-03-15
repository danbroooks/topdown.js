

/**
 * declare object
 */
var fn = {};



/**
 *
 */
fn.wrap = function(number, wrap) {
  return ((number % wrap) + wrap) % wrap;
};



/**
 *
 */
fn.randNum = function (num) {
  return (Math.ceil(Math.random() * num) % num);
};



/**
 *
 */
fn.chanceIn = function (oneIn) {
  return fn.randNum(oneIn) ? false : true;
};



/**
 *
 */
fn.fromArray = function (array) {
  var r = fn.chanceIn(array.length);
  return array[r];
};



/**
 * Exposure to browser
 */
window.fn = fn;



/**
 * Exposure to other internal modules
 */
module.exports = fn;
