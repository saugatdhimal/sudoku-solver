'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle,coordinate,value} = req.body;
      if(!puzzle || !coordinate || !value){
        return res.json({ error: 'Required field(s) missing' })
      }
      const row = coordinate.split("")[0];
      const column = coordinate.split("")[1];
      if(coordinate.length !==2 || 
         !/[a-i]/i.test(row) ||
         !/[1-9]/i.test(column)
         ){
           return res.json({ error: 'Invalid coordinate'})
         }
        if(!/[1-9]/i.test(value)){
          return res.json({ error: 'Invalid value' })
        }
        if(puzzle.length != 81){
          return res.json({ error: 'Expected puzzle to be 81 characters long' })
        }
        if(/[^1-9.]/g.test(puzzle)){
          return res.json({ error: 'Invalid characters in puzzle' })
        }
        let validRow = solver.checkRowPlacement(puzzle,row,column,value);
        let validColumn = solver.checkColPlacement(puzzle,row,column,value);
        let validRegion = solver.checkRegionPlacement(puzzle,row,column,value);
        let conflicts = [];
        if(validRow && validColumn && validRegion){
          res.json({valid: true})
        }else{
        if(!validRow){
          conflicts.push("row")
        }
        if(!validColumn){
          conflicts.push("column")
        }
        if(!validRegion){
          conflicts.push("region")
        }
        res.json({valid: false, conflict: conflicts})
        }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const {puzzle} = req.body;
      
      if(!puzzle){
        return res.json({ error: 'Required field missing' })
      }
      if(puzzle.length != 81){
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      }
      let regex = /[^1-9.]/g.test(puzzle);
      if(regex){
        return res.json({ error: 'Invalid characters in puzzle' })
      }

      let board = solver.stringToGrid(puzzle);
      let newboard = solver.solve(board);
      if(newboard.includes("0")){
        res.json({ error: 'Puzzle cannot be solved' })
      }
      if(/[1-9]/.test(newboard)){
        res.json({solution: newboard})
      }
    });
};
