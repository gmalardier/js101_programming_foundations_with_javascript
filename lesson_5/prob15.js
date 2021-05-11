let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let arr2 = arr.filter(element => {
  let temp = Object.values(element).map(i => i.every(num => num % 2 === 0));
  if (temp.every(i => i === true)) {
    return element;
  }
})

console.log(arr2);