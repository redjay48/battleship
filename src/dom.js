const rows = document.querySelectorAll(".rows");
const cells = document.querySelectorAll(".cells");

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

///placement for a single ship

const ship1 = document.createElement("div");

ship1.setAttribute("draggable", "true");
ship1.style.overflow = "visible";
ship1.classList.add("ship");
ship1.style.height = `${33 + 36 * (4 - 1)}px`;

cells[12].appendChild(ship1);

ship1.addEventListener("click", changeAlignment);

ship1.addEventListener("dragleave", () => {
  // let currentShip = ship1;
  let previousParent = ship1.parentNode;
  cells.forEach((cell) => {
    cell.addEventListener("dragenter", (e) => {
      e.preventDefault();
      if (!e.target.classList.contains("ship")) {
        let newParent = e.target;
        console.log(newParent);
        if (newParent !== previousParent && !newParent.contains(ship1)) {
          previousParent.removeChild(ship1);
          newParent.append(ship1);
        }
        previousParent = newParent;
      }
    });
  });
});


// function to enter an array and return an array with surrounding numbers
// for vertical ship only
function surroundVertical(array) {
  let newArray = [];
  let len = array.length;
  let firstNum = array[0];
  let lastNum = array[len - 1];
  findBorderNumVertical(firstNum, "first", newArray);
  for (let i = 0; i < len; i++) {
    if (array[i] % 10 !== 0) {
      newArray.push((array[i] - 1).toString());
    }
    if (array[i] % 10 !== 9) {
      newArray.push((array[i] + 1).toString());
    }
  }
  findBorderNumVertical(lastNum, "last", newArray);

  newArray.forEach((element) => {
    if (parseInt(element) < 10 && parseInt(element) >= 0) {
      newArray.splice(newArray.indexOf(element), 1, "".concat("0", element));
    }
  });

  return newArray;
}

function findBorderNumVertical(num, pos, array) {
  // let numString = num.toString();
  // const i = parseInt(numString.split("")[0]);
  // const j = parseInt(numString.split("")[1]);
  if (pos === "first") {
    if (num > 9) {
      if (num % 10 !== 0) {
        array.push((num - 11).toString());
      }
      array.push((num - 10).toString());

      if (num % 10 !== 9) {
        array.push((num - 9).toString());
      }
    }
  }

  if (pos === "last") {
    if (num < 90) {
      if (num % 10 !== 0) {
        array.push((num + 9).toString());
      }
      array.push((num + 10).toString());
      if (num % 10 !== 9) {
        array.push((num + 11).toString());
      }
    }
  }
  return array;
}

//for horizontal ship
