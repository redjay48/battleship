const gameBoard = function () {
    let board = {};
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[`${i}${j}`] = { hit: null, occupy: null };
      }
    }
    const shipClass = {
      class1: 5,
      class2: 4,
      class3: 3,
    };
    const placeShip = (coOrd, alignment, type) => {
      console.log(type);
      const size = shipClass[type];
      type = ship(size, type);
      console.log(type);
      const xAxis = coOrd.split("")[0];
      const yAxis = coOrd.split("")[1];
      if (alignment === "horizontal") {
        for (let j = yAxis; j < size; j++) {
          board[`${xAxis}${j}`].occupy = type;
        }
      } else if (alignment === "vertical") {
        for (let i = xAxis; i < size; i++) {
          board[`${i}${yAxis}`].occupy = type;
        }
      }
      return {type};
    };
    const recieveAttack = (coOrd) => {
      if (board[coOrd].occupy !== null ) {
          board[coOrd].occupy.hit();
          board[coOrd].hit = 'hit';
      } else {
        board[coOrd].hit = "miss";
      }
    };
    return {
      placeShip,
      board,
      recieveAttack,
    };
  };
  

module.exports = gameBoard;