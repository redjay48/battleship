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

  let totalOccupy = 0;
  let totalShips = [];
  let totalHits = 0;
  let totalMisses = 0;

  const placeShip = (coOrd, alignment, type) => {
    const size = shipClass[type];
    type = ship(size, type);
    totalShips.push(type);
    console.log("totalships",totalShips);
    const xAxis = coOrd.split("")[0];
    const yAxis = coOrd.split("")[1];
    if (alignment === "horizontal") {
      for (let j = yAxis; j < size; j++) {
        board[`${xAxis}${j}`].occupy = type;
        totalOccupy++;
      }
    } else if (alignment === "vertical") {
      for (let i = xAxis; i < size; i++) {
        board[`${i}${yAxis}`].occupy = type;
        totalOccupy++;
      }
    }
    return {type};
  };
  const recieveAttack = (coOrd) => {
    if (board[coOrd].occupy !== null ) {
      if(board[coOrd].hit !== 'hit') {
        board[coOrd].occupy.hit();
        board[coOrd].hit = 'hit';
        totalHits++;
      }
    } else {
      board[coOrd].hit = "miss";
      totalMisses++;
    }
    trackHit(coOrd);
    reportSunk();
  };

  const trackHit = (coOrd) => {
    if(board[coOrd].hit === 'hit') {
      console.log("It'a a Hit")
    } else if (board[coOrd].hit === 'miss') {
      console.log("It's a Miss");
    }
  };

  const reportSunk = () => {
    let count = 0;
    for(let i = 0; i < totalShips.length; i++) {
      if(totalShips[i].isSunk()) {
        console.log(`${totalShips[i].name} has been sunk`);
        count++;
      }
    }
    if(count === totalShips.length) {
      console.log('all ships have been sunk');
    }
  }

  return {
    placeShip,
    board,
    recieveAttack,
  };
};


module.exports = gameBoard;