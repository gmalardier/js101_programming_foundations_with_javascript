// Sort small to big
let arr = [1, 2, 22, 11, 203, 4];

let arr2 = arr.sort((a, b) => a - b);

console.log(arr2)


// Sort alphabetically
let letter = ['b', 'a', 't', 's'];

let letter2 = letter.sort();

console.log(letter2);


// Sort by word length
let words = ['go', 'ahead', 'and', 'jump'];

let words2 = words.sort((a, b) => a.length - b.length);

console.log(words2);