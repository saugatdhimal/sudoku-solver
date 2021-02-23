class SudokuSolver {

  validate(string) {
    if (!string) return false;
    let invalidCharacter = /[^.1-9]/.test(string);
    if (invalidCharacter) return false
    if (string.length != 81) return false
  }

  stringToGrid(puzzleString){
  let grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ];
  let row = -1;
  let col = 0;
  for(let i = 0; i < 81; i++){
    if(i % 9 === 0){row++}
    if(col % 9 === 0){col = 0}
    grid[row][col] = puzzleString[i]==="."?0:+puzzleString[i];
    col++
  }
  return grid;
 }

  letterToNum(row){
    switch(row.toUpperCase()){
      case "A":
        return 1;
      case "B":
        return 2;
      case "C":
        return 3;
      case "D":
        return 4;
      case "E":
        return 5;
      case "F":
        return 6;
      case "G":
        return 7;
      case "H":
        return 8;
      case "I":
        return 9;
      default:
        return "none";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzGrid = this.stringToGrid(puzzleString);
    row = this.letterToNum(row);
    if(puzGrid[row-1][column-1] !== 0){
      return false
    }
    for(let i = 0; i < 9; i++){
      if(puzGrid[row-1][i] == value){
        return false
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzGrid = this.stringToGrid(puzzleString);
    row = this.letterToNum(row)  ;  
    if(puzGrid[row-1][column-1] !== 0){
      return false
    }
    for(let i = 0; i < 9; i++){
      if(puzGrid[i][column-1] == value){
        return false
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzGrid = this.stringToGrid(puzzleString);
    row = this.letterToNum(row);
    if(puzGrid[row-1][column-1] !== 0){
      return false
    }    
    let puzRow = Math.floor(row / 3) * 3;
    let puzCol = Math.floor(column / 3) * 3;
    
    for (var i = 0; i < 3; i++){
      for (var j = 0; j < 3; j++){
        if (puzGrid[puzRow + i][puzCol + j] == value)
          return false;
        }
    }

    return true;
  }

nextEmptySpot(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
}
checkRow(board, row, value){
    for(var i = 0; i < board[row].length; i++) {
        if(board[row][i] === value) {
            return false;
        }
    }
   
    return true;
}

checkColumn(board, column, value){
    for(var i = 0; i < board.length; i++) {
        if(board[i][column] === value) {
            return false;
        }
    }

    return true;
};

checkSquare(board, row, column, value){
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(column / 3) * 3;
    
    for (var r = 0; r < 3; r++){
        for (var c = 0; c < 3; c++){
            if (board[boxRow + r][boxCol + c] === value)
                return false;
        }
    }

    return true;
};

checkValue(board, row, column, value) {
    if(this.checkRow(board, row, value) &&
      this.checkColumn(board, column, value) &&
      this.checkSquare(board, row, column, value)) {
        return true;
    }
    
    return false; 
};

solve(board) {  
    let emptySpot = this.nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];
    // there is no more empty spots
    if (row === -1){
        return board;
    }

    for(let num = 1; num<=9; num++){
        if (this.checkValue(board, row, col, num)){
            board[row][col] = num;
            this.solve(board);
        }
    }

    if (this.nextEmptySpot(board)[0] !== -1){
        board[row][col] = 0;
    }
    return board.flat().join("");
}
}

module.exports = SudokuSolver;

