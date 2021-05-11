//Random function
function randomInt(num) {
  return Math.floor(Math.random() * num);
}

// create a random number for 0 to 9
function randomNumber() {
  return String(randomInt(10));
} 

// create a random letter (assign number 0-5 to a-f)
function randomLetter() {
  let choices = {0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f'};
  return choices[randomInt(6)]
}

// create a random choice between using a number or a letter (0 === number, 1 === letter)
let numberOrLetter = () => randomInt(2) === 0 ? randomNumber() : randomLetter();

// Patterns
function pattern(num) {
  let str = '';
  do {str += numberOrLetter()} while (
    str.length < num);
  return str;
}

// Declare variable UUID
let UUID = pattern(8) + "-" + pattern(4) + '-' + pattern(4) + '-' + pattern(4) + '-' + pattern(12);
console.log(UUID);