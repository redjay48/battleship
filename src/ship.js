const ship = function (length, name) {
    this.name = name;
    let hits = 0;
    const hit = () => {
      hits++;
    };
    const isSunk = () => {
      if (length === hits) {
        return true;
      } else return false;
    };
    return { hit, isSunk, name };
  };

  module.exports = ship;