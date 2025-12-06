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

// The ranges are separated by commas (,);
//  each range gives its first ID and last ID separated by a dash (-).

// Since the young Elf was just doing silly patterns,
// you can find the invalid IDs by looking for any ID which is made only of some sequence
// of digits repeated twice. So, 55 (5 twice), 6464 (64 twice), and 123123 (123 twice)
// would all be invalid IDs.

// None of the numbers have leading zeroes; 0101 isn't an ID at all.
//  (101 is a valid ID that you would ignore.)
const [input] = readInput()

const ranges = input.split(',')

let sum = 0;

function splitStringInHalf (str) {
  const mid = Math.ceil(str.length / 2)
  return [str.slice(0, mid), str.slice(mid)]
}

ranges.forEach(range => {
  const [startStr, endStr] = range.split('-')

  const start = Number(startStr)
  const end = Number(endStr)

  for (let i = start; i <= end; ++i) {
    const currentSequence = String(i)

    if (currentSequence.length % 2 !== 0) continue

    const [startSequence, endSequence] = splitStringInHalf(currentSequence)

    if (startSequence === endSequence){
       sum += Number(startSequence + endSequence)
    }
  }
})

console.log("resposta ->", sum)
