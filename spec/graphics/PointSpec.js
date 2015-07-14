describe("Point", function() {

  var Point = require('../../src/graphics/Point');

  describe("constructor", function() {

    it("should return new instance", function() {
      expect(Point() instanceof Point.Constructor).toBeTruthy();
    });

    it("should default x & y to 0 when no arguments passed to constructor", function() {
      var pt = Point();
      expect(pt.x).toEqual(0);
      expect(pt.y).toEqual(0);
    });

    it("should take arguments Point(x, y) in constructor", function() {
      var pt = Point(10, 20);
      expect(pt.x).toEqual(10);
      expect(pt.y).toEqual(20);
    });

    it("should take array of length 2 as Point([x, y]) in constructor", function(){
      var pt = Point([10, 20]);
      expect(pt.x).toEqual(10);
      expect(pt.y).toEqual(20);
    });

    it("should throw exception when passed too short an array", function() {

      expect(function () {
        var ptTooShortArray = Point([10]);
      }).toThrow(
        new Error('Point was passed invalid arguments')
      );
    });

    it("should throw exception when passed too long an array", function() {

      expect(function () {
        var ptTooLongArray = Point([10, 20, 30]);
      }).toThrow(
        new Error('Point was passed invalid arguments')
      );
    });

    it("should throw exception when not passed enough arguments", function() {

      expect(function () {
        var ptNotEnoughArgs = Point(10);
      }).toThrow(
        new Error('Point was passed invalid arguments')
      );
    });

    it("should throw exception when passed too many arguments", function() {
      expect(function(){
        var ptTooManyArgs = Point(10, 20, 30);
      }).toThrow(
        new Error('Point was passed invalid arguments')
      );
    });
  });

  describe("Instance method shift", function() {

    beforeEach(function(){
      this.pt = Point(30, 20);
    });

    it("should shift based on two numbers", function() {
      this.pt.shift(-10, 20);

      expect(this.pt.x).toEqual(20);
      expect(this.pt.y).toEqual(40);
    });

    it("should shift from another point instance", function() {
      this.pt.shift( Point(40, -30) );
      expect(this.pt.x).toEqual(70);
      expect(this.pt.y).toEqual(-10);
    });

    it("should be chainable", function() {
      expect(this.pt.shift(10, 10) instanceof Point.Constructor).toBeTruthy();
    });
  });

  describe("Instance method invert", function() {

    beforeEach(function(){
      this.pt = Point(-10, 20);
    });

    it("should invert the point values", function() {
      this.pt.invert();
      expect(this.pt.x).toEqual(10);
      expect(this.pt.y).toEqual(-20);
    });

    it("should ensure 0 is not returned as -0", function(){
      var invertedzero = Point(0, 0).invert();

      expect(1 / invertedzero.x).toEqual(Number.POSITIVE_INFINITY);
      expect(1 / invertedzero.y).toEqual(Number.POSITIVE_INFINITY);

    });

    it("should be chainable", function() {
      expect(this.pt.invert() instanceof Point.Constructor).toBeTruthy();
    });
  });

  describe("Static method Clone", function() {

    it("should return a Point instance", function(){
      expect(Point.Clone(Point()) instanceof Point.Constructor).toBeTruthy();
    });

    it("should return a new cloned instance", function(){
      var point = Point();
      var clone = Point.Clone(point);
      clone.shift(10, 10);

      expect(clone.x).not.toEqual(point.x);
      expect(clone.y).not.toEqual(point.y);
    });

    it("should throw error when not passed a point instance", function(){

      var err = new Error("Point.Clone must be passed an instance of Point");
      expect(function(){
        Point.Clone(null);
      }).toThrow(err);

      expect(function(){
        Point.Clone(22);
      }).toThrow(err);
    });
  });

  describe("Static method Add", function() {

    beforeEach(function(){
      this.a = Point(10, 20);
      this.b = Point(20, 10);
      this.pt = Point.Add(this.a, this.b);
    });

    it("should add two points together", function () {
      expect(this.pt.x).toEqual(30);
      expect(this.pt.y).toEqual(30);
    });

    it("should not effect passed in instances", function () {
      expect(this.a.x).toEqual(10);
      expect(this.a.y).toEqual(20);
      expect(this.b.x).toEqual(20);
      expect(this.b.y).toEqual(10);
    });

  });

  describe("Static invert", function() {

    beforeEach(function(){
      this.orig = Point(10, 20);
      this.pt = Point.Invert(this.orig);
    });

    it("should invert the position of the passed Point object", function() {
      expect(this.pt.x).toEqual(-10);
      expect(this.pt.y).toEqual(-20);
    });

    it("should not effect the instance passed in", function() {
      expect(this.pt.x).not.toEqual(this.orig.x);
      expect(this.pt.y).not.toEqual(this.orig.y);
    });
  });


});
