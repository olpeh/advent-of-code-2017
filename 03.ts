// --- Day 3: Spiral Memory ---

// You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

// Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23---> ...

// While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

// For example:

//     Data from square 1 is carried 0 steps, since it's at the access port.
//     Data from square 12 is carried 3 steps, such as: down, left, left.
//     Data from square 23 is carried only 2 steps: up twice.
//     Data from square 1024 must be carried 31 steps.

// How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

// Your puzzle input is 347991.

const getCoordinates = (input: number) => {
  // Caexamplelculate the (x, y) position in the grid for number
  // Move the carret in the grid starting from 1 (0,0)
  // Positive x to the right and positive y upward from (0,0)
  // Spiral moves in steps 1,1,2,2,3,3,4,4,5,5 and so on
  // Starting with right, up, left, left, down, down, right, right, right and so on

  const right = { x: 1, y: 0 },
    up = { x: 0, y: 1 },
    left = { x: -1, y: 0 },
    down = { x: 0, y: -1 },
    directions = [right, up, left, down];

  let x = 0,
    y = 0,
    step = 0,
    directionNow = right,
    round = 0,
    i = 0;

  while (i < input) {
    for (let j = 0; j < step && i < input; j++) {
      x += directionNow.x;
      y += directionNow.y;
      i++;
    }

    // Step will increase every second round
    if (round % 2 === 0) {
      step++;
    }

    directionNow = directions[round % 4];
    round++;

    if (i === 0) {
      i++;
    }
  }
  return { x, y };
};

const calculate = (input: number) => {
  const coordinates = getCoordinates(input);
  console.log(coordinates);
  // The distance from coordinates is the same as going straight in x and y directions separately
  return Math.abs(coordinates.x) + Math.abs(coordinates.y);
};

const shouldBe0 = 1,
  shouldBe3 = 12,
  shouldBe2 = 23,
  shouldBe31 = 1024,
  input = 347991;

console.log(calculate(shouldBe0)); // 0
console.log(calculate(shouldBe3)); // 3
console.log(calculate(shouldBe2)); // 2
console.log(calculate(shouldBe31)); // 31
console.log(calculate(input)); // 480
