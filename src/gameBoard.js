const gameBoard = function () {
  let board = {};
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[`${i}${j}`] = { hit: null, occupy: null };
    }
  }
  const shipClass = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
  };

  const alignment = ["horizontal", "vertical"];

  let totalOccupy = 0;
  let totalShips = [];
  let totalHits = 0;
  let totalMisses = 0;

  const placeShip = (coOrd, alignment, type) => {
    const size = shipClass[type];
    type = new ship(size, type);
    totalShips.push(type);
    console.log(size);
    console.log("totalships", totalShips);
    const xAxis = parseInt(coOrd.split("")[0]);
    const yAxis = parseInt(coOrd.split("")[1]);
    if (alignment === "horizontal") {
      for (let j = yAxis; j < yAxis + size; j++) {
        board[`${xAxis}${j}`].occupy = type;
        totalOccupy++;
      }
    } if (alignment === "vertical") {
      for (let i = xAxis; i < xAxis + size; i++) {
        board[`${i}${yAxis}`].occupy = type;
        totalOccupy++;
      }
    }
  };
  const recieveAttack = (coOrd) => {
    if (board[coOrd].occupy !== null) {
      if (board[coOrd].hit !== "hit") {
        board[coOrd].occupy.hit();
        board[coOrd].hit = "hit";
        legalMoves(coOrd);
        totalHits++;
      } else {
        return;
      }
    } else {
      board[coOrd].hit = "miss";
      totalMisses++;
    }
    trackHit(coOrd);
    reportSunk();
  };

  const trackHit = (coOrd) => {
    if (board[coOrd].hit === "hit") {
      console.log("It'a a Hit");
    } else if (board[coOrd].hit === "miss") {
      console.log("It's a Miss");
    }
  };

  const reportSunk = () => {
    let count = 0;
    for (let i = 0; i < totalShips.length; i++) {
      if (totalShips[i].isSunk()) {
        console.log(`${totalShips[i].name} has been sunk`);
        count++;
      }
    }
    if (count === totalShips.length) {
      console.log("all ships have been sunk");
    }
  };


  const legalMoves = (coOrd) => {
    const i = parseInt(coOrd.split("")[0]);
    const j = parseInt(coOrd.split("")[1]);
    console.log("i and j", i, j);
    if (i + 1 < 10 && j + 1 < 10) {
      board[`${i + 1}${j + 1}`].hit = "block";
    }
    if (i - 1 >= 0 && j - 1 >= 0) {
      board[`${i - 1}${j - 1}`].hit = "block";
    }
    if (i + 1 < 10 && j - 1 >= 0) {
      board[`${i + 1}${j - 1}`].hit = "block";
    }
    if (i - 1 >= 0 && j + 1 < 10) {
      board[`${i - 1}${j + 1}`].hit = "block";
    }
  };

  return {
    placeShip,
    board,
    recieveAttack,
  };
};

module.exports = gameBoard