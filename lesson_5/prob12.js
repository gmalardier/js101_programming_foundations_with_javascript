let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let arr2 = arr.map(element => {
  let subArr = element.slice().filter(num => num % 3 === 0);
  return subArr;
});

console.log(arr2);
console.log(arr);