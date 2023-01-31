const computer = function () {
  const player2 = new gameBoard();

  // for each ship in the shipclass randomly assign a position and alignment if the postion is empty
  for (key in player2.shipClass) {
      let randomNum = Math.floor(Math.random() * 100);
      let randomAlign = Math.floor(Math.random() * 2);
      aiPlacement(player2.shipClass[key], randomNum, randomAlign);
  }
  console.log(player2.board);
};

const computerPlays = function() {
  let randomHit1 = Math.floor(Math.random() * 10);
  let randomHit2 = Math.floor(Math.random() * 10);

  console.log(`${randomHit1}${randomHit2}`);
  player2.recieveAttack(`${randomHit1}${randomHit2}`);
}


const aiPlacement = (ship, randomNum, randomAlign) => {
  for(let i = 0; i < ship; i++) {
    if (player2.board[randomNum + i].place === null) {
      player2.placeShip(`${randomNum}`, `${player2.alignment[randomAlign]}`, `${key}`);
      console.log(`${randomNum}`, `${player2.alignment[randomAlign]}`, `${key}`);
    }
  }
}

  module.exports = computer, computerPlays