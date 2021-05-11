let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

//let obj = Object.fromEntries(arr);

let obj = {};

arr.forEach(element => {
  let prop = element[0];
  let value = element[1];
  obj[prop] = value;
  return obj;
});

console.log(obj);

// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }