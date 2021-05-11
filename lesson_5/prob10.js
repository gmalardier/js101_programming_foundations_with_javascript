let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let arr2 = arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    subArr.sort().reverse();
  } else {
    subArr.sort((a, b) => b - a);
  } 
  return subArr
});
console.log(arr2);