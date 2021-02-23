const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let validPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
suite('UnitTests', () => {
  suite("solver test", function(){
    test("Logic handles a valid puzzle string of 81 characters",function(done){
      let grid = solver.stringToGrid(validPuzzle);
      let result = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      assert.equal(solver.solve(grid), result);
      done();
    })

    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)",function(done){
      let invalidPuzzle = '1.5..2.84..63.12.7.2..5..a..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.validate(invalidPuzzle),false);
      done();
    })

    test("Logic handles a puzzle string that is not 81 characters in length",function(done){
      let invalidPuzzle = '1.5..2.84..63.12.7.2..5....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.validate(invalidPuzzle),false);
      done();
    })

    test("Logic handles a valid row placement",function(done){
      assert.equal(solver.checkRowPlacement(validPuzzle,"A",2,3),true);
      done();
    })

    test("Logic handles an invalid row placement",function(done){
      assert.equal(solver.checkRowPlacement(validPuzzle,"A",2,1),false);
      done();
    })

    test("Logic handles a valid column placement",function(done){
      assert.equal(solver.checkColPlacement(validPuzzle,"A",2,3),true);
      done();
    })

    test("Logic handles an invalid column placement",function(done){
      assert.equal(solver.checkColPlacement(validPuzzle,"A",0,1),false);
      done();
    })

    test("Logic handles a valid region (3x3 grid) placement",function(done){
      assert.equal(solver.checkRegionPlacement(validPuzzle,"A",2,3),true);
      done();
    })

    test("Logic handles an invalid region (3x3 grid) placement",function(done){
      assert.equal(solver.checkRegionPlacement(validPuzzle,"A",2,1),false);
      done();
    })

    test("Valid puzzle strings pass the solver",function(done){
      let grid = solver.stringToGrid(validPuzzle);
      let result = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      assert.equal(solver.solve(grid), result);
      done();
    })

    test("Invalid puzzle strings fail the solver",function(done){
      let invalidPuzzle = '145..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let grid = solver.stringToGrid(invalidPuzzle);
      assert.equal(solver.solve(grid),'145002084006301207020050000090010000802036740307020090470008001001600009269140370');
      done();
    })

    test("Solver returns the the expected solution for an incomplete puzzzle",function(done){
      let grid = solver.stringToGrid(validPuzzle);
      let result = '135762984946381257728459613694517832812936745357824196473298561581673429269145378';
      assert.equal(solver.solve(grid), result);
      done();
    })

  })
});
