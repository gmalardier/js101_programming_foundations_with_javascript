let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let arr2 = arr.map(element => {
  let obj = {};
  for (let prop in element) {
   obj[prop] = element[prop] + 1;
  }
  return obj;
});
console.log(arr2);
console.log(arr);