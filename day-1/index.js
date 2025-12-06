// 0 - 99
//
// Because the dial is a circle, turning the dial left from 0 one click makes it point at 99.
//  Similarly, turning the dial right from 99 one click makes it point at 0.
//
// The dial starts by pointing at 50.

// the actual password is the number of times the dial is
// left pointing at 0 after any rotation in the sequence.
const fs = require('fs');
const path = require('path');

function readInput() {
  try {
    const filePath = path.join(__dirname, 'input.txt');
    const data = fs.readFileSync(filePath, 'utf8');

    return data
      .split('\n')
      .map(line => line.trim())
      .filter(line => Boolean(line.length))
  } catch (error) {
    console.error('deu ruim:', error.message);
    return [];
  }
}

function parseRotation(rotation) {
  return {
    direction: rotation[0],
    amount: parseInt(rotation.substring(1)) % 100
  }
}

const rotations = readInput();

let currentPosition = 50
let password = 0

rotations.forEach(rotation => {
  const { direction, amount } = parseRotation(rotation);

  if (direction == "L") {
    let newPosition = currentPosition - amount

    if (newPosition < 0) {
      newPosition += 100
    }

    if (newPosition == 0) {
      ++password
    }

    currentPosition = newPosition
  } else {
    let newPosition = currentPosition + amount

    if (newPosition >= 100) {
      newPosition -= 100
    }

    if (newPosition === 0) {
      ++password
    }
    currentPosition = newPosition
  }
})

console.log("password", password)
