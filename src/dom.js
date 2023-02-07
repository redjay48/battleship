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
    cells[randomNum].classList.add("holder");
  }
  bship.addEventListener("click", changeAlignment);
}

function changeOrientation(e) {
  if (parseInt(e.target.style.height) > parseInt(e.target.style.width)) {
    let temp = e.target.style.height;
    e.target.style.height = e.target.style.width;
    e.target.style.width = temp;
  } else {
    let temp = e.target.style.width;
    e.target.style.width = e.target.style.height;
    e.target.style.height = temp;
  }
}

function addOrientationClass(e) {
  let cell = e.target.parentNode;
  if (e.target.classList.contains("vertical")) {
    e.target.classList.remove("vertical");
    e.target.classList.add("horizontal");
    domDisplayShip(cell, 4, "vertical", false);
    domDisplayShip(cell, 4, "horizontal", true);
  } else if (e.target.classList.contains("horizontal")) {
    e.target.classList.remove("horizontal");
    e.target.classList.add("vertical");
    domDisplayShip(cell, 4, "horizontal", false);
    domDisplayShip(cell, 4, "vertical", true);
  }
}

const ships = document.querySelectorAll(".ship");

ships.forEach((ship) => {
  ship.addEventListener("dragleave", () => {
    let currentShip = ship;
    cells.forEach((cell) => {
      cell.addEventListener("dragenter", (e) => {
        let parent = currentShip.parentNode;
        let newShip = document.createElement("div");
        newShip.classList.add("ship");
        e.target.append(currentShip);
        parent.childNodes[0].classList.remove("ship");
      });
    });
  });
});

///placement for a single ship
// factory for ship
function createShip(id, orientation, size) {
  const ship = document.createElement("div");
  ship.setAttribute("draggable", "true");
  ship.classList.add("ship");
  ship.classList.add(orientation);
  ship.setAttribute("id", id);
  if (orientation === "horizontal") {
    ship.style.width = `${33 + 36 * (size - 1)}px`;
  } else {
    ship.style.height = `${33 + 36 * (size - 1)}px`;
  }
  return ship;
}

const anotherShip = createShip("anothership", "horizontal", 2);
const battleship = createShip("battleship", "vertical", 4);

cells[12].appendChild(battleship);

battleship.addEventListener("click", (e) => {
  changeOrientation(e);
  addOrientationClass(e);
});

battleship.addEventListener("dragleave", () => {
  let previousParent = battleship.parentNode;
  cells.forEach((cell) => {
    cell.addEventListener("dragenter", (e) => {
      e.preventDefault();
      if (!e.target.classList.contains("ship")) {
        let newParent = e.target;
        if (newParent !== previousParent && !newParent.contains(battleship)) {
          previousParent.removeChild(battleship);
          newParent.append(battleship);
        }
        previousParent = newParent;
      }
    });
  });
});

// test another ship for drag and drop over occupied or blocked cells

// cells[72].appendChild(anothership);

//remove surround cells class when ship is dragged
battleship.addEventListener("dragstart", (e) => {
  domDisplay(e.target.parentNode, false);
});

//add surround cells class when ship is dropped
battleship.addEventListener("dragend", (e) => {
  e.preventDefault();
  domDisplay(e.target.parentNode, true);
});

//surround ship cells when dom is loaded
cells.forEach((cell) => {
  if (cell.children[0] !== undefined) {
    if (
      cell.children[0].classList.contains("vertical") &&
      cell.parentNode.parentNode.id === "grid-1"
    ) {
      domDisplayShip(cell, 4, "vertical", true);
    } else {
      domDisplayShip(cell, 4, "horizontal", true);
    }
  }
});

function domDisplay(cell, boolean) {
  if (cell.children[0] !== undefined) {
    if (
      cell.children[0].classList.contains("vertical") &&
      cell.parentNode.parentNode.id === "grid-1"
    ) {
      domDisplayShip(cell, 4, "vertical", boolean);
    } else {
      domDisplayShip(cell, 4, "horizontal", boolean);
    }
  }
}

function domDisplayShip(cell, len, orientation, boolean) {
  let shipCells = shipCellArray(cell.classList[1], orientation, len);
  cells.forEach((cell) => {
    for (let i = 0; i < shipCells.length; i++) {
      if (
        parseInt(cell.classList[1]) === shipCells[i] &&
        cell.parentNode.parentNode.id === "grid-1" &&
        boolean === true
      ) {
        cell.classList.add("occupy");
      } else if (
        parseInt(cell.classList[1]) === shipCells[i] &&
        cell.parentNode.parentNode.id === "grid-1" &&
        boolean === false
      ) {
        cell.classList.remove("occupy");
      }
    }
    if (orientation === "vertical") {
      let blockedCells = surroundVertical(shipCells);
      displayBlocked(blockedCells, boolean);
    } else if (orientation === "horizontal") {
      let blockedCells = surroundHorizontal(shipCells);
      displayBlocked(blockedCells, boolean);
    }
  });
}

function displayBlocked(array, boolean) {
  cells.forEach((cell) => {
    for (let i = 0; i < array.length; i++) {
      if (
        cell.classList[1] === array[i] &&
        cell.parentNode.parentNode.id === "grid-1" &&
        boolean === true
      ) {
        cell.classList.add("blocked");
      } else if (
        cell.classList[1] === array[i] &&
        cell.parentNode.parentNode.id === "grid-1" &&
        boolean === false
      ) {
        cell.classList.remove("blocked");
      }
    }
  });
}

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
function surroundHorizontal(array) {
  let newArray = [];
  let len = array.length;
  let firstNum = array[0];
  let lastNum = array[len - 1];

  //Add numbers in the front
  findBorderNumHorizontal(firstNum, "first", newArray);

  //Add adjacent numbers
  for (let i = 0; i < len; i++) {
    if (parseInt(array[i] - 10) >= 0) {
      newArray.push((array[i] - 10).toString());
    }
    if (parseInt(array[i] + 10) < 100) {
      newArray.push((array[i] + 10).toString());
    }
  }

  //Add number in the back
  findBorderNumHorizontal(lastNum, "last", newArray);

  // Add '0' to single digit number to match the cell position class
  newArray.forEach((element) => {
    if (parseInt(element) < 10 && parseInt(element) >= 0) {
      newArray.splice(newArray.indexOf(element), 1, "".concat("0", element));
    }
  });

  return newArray;
}

function findBorderNumHorizontal(num, pos, array) {
  if (pos === "first") {
    if (num % 10 !== 0) {
      array.push((num - 1).toString());
      if (num - 1 - 10 >= 0) {
        array.push((num - 1 - 10).toString());
      }
      if (num - 1 + 10 < 100) {
        array.push((num - 1 + 10).toString());
      }
    }
  }
  if (pos === "last") {
    if (num % 10 !== 9) {
      array.push((num + 1).toString());
      if (num + 1 - 10 >= 0) {
        array.push((num + 1 - 10).toString());
      }
      if (num + 1 + 10 < 100) {
        array.push((num + 1 + 10).toString());
      }
    }
  }
  return array;
}

//make an array for the cells that the ship occupies
function shipCellArray(pos, orientation, len) {
  let newArray = [];
  for (let i = 0; i < len; i++) {
    if (orientation === "vertical") {
      newArray.push(parseInt(pos) + 10 * i);
    } else if (orientation === "horizontal") {
      newArray.push(parseInt(pos) + 1 * i);
    }
  }
  return newArray;
}

//make ship factory for DOM

//omit cell classes that don't have ship or surround ship

//make factory for all functions including ship, length, placement, occupying cells and blocked cells
//function that doesn't allow ship to be placed in cells that are occupied or blocked
//function to place all ships randomly by avoiding occupied or blocked cells
