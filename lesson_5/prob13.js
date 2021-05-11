let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort((a, b) => {
  let aSum = 0;
  a.forEach(num => {
    if (num % 2 !== 0) {
      aSum += num;
    }
    return a = aSum;
  })
  let bSum = 0;
  b.forEach(num => {
    if (num % 2 !== 0) {
      bSum += num;
    }
    return b = bSum
  })
  return a - b;
})

console.log(arr);