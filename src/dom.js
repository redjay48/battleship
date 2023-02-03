const rows = document.querySelectorAll(".rows");
const cells = document.querySelectorAll(".cells");
const ship1 = document.querySelector(".ship");
cells.forEach((cell) => {
  let cellNumber = document.createTextNode(`${cell.classList[1]}`);
  cell.append(cellNumber);
  // console.log(cellNumber);
});

// ship1.addEventListener('click', (e)=> {
//   console.log(e.target.parentNode);
// })

const shipClass = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

let lengths = [];
for (const key in shipClass) {
  lengths.push(shipClass[key]);
}

let used = [];

for (let bship in shipClass) {
  bship = document.createElement("div");
  bship.setAttribute("draggable", "true");
  bship.style.overflow = "visible";
  bship.classList.add("ship");
  let length = lengths.pop();
  bship.style.height = `${33 + 36 * (length - 1)}px`;
  let randomNum = Math.floor(Math.random() * 100);
  // console.log(bship, randomNum, length);
  if (randomNum + length < 100 && !used.includes(randomNum)) {
    used.push(randomNum);
    cells[randomNum].append(bship);
    cells[randomNum].classList.add('holder');
  }
  bship.addEventListener("click", changeAlignment);
}

function changeAlignment(e) {
  if (parseInt(e.target.style.height) > parseInt(e.target.style.width)) {
    let temp = e.target.style.height;
    e.target.style.height = e.target.style.width;
    e.target.style.width = temp;
    let vertical = true;
    // console.log(e.target);
  } else {
    let temp = e.target.style.width;
    e.target.style.width = e.target.style.height;
    e.target.style.height = temp;
  }
}

//block surrounding cells of the ship
// function blockPosition(num, len) {
//   const i = parseInt(num.split("")[0]);
//   const j = parseInt(num.split("")[1]);

// }

const ships = document.querySelectorAll(".ship");

ships.forEach((ship) => {
  ship.addEventListener('dragleave', () => {
    let currentShip = ship;
    cells.forEach((cell) => {
      cell.addEventListener("dragenter", (e) => {
        let parent = currentShip.parentNode;
        let newShip = document.createElement('div');
        newShip.classList.add('ship');
        e.target.append(currentShip);
        parent.childNodes[0].classList.remove('ship');
      });
    });
  })
  
});

///placement left