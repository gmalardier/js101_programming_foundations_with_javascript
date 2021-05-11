let str = "The Flintstones Rock!";

let counter = 0;
while (counter <= 10) {
  console.log(str.padStart(counter, ' '));
  counter += 1;
}

console.log(str);