let words = ['go', 'ahead', 'and', 'jump'];

let words2 = words.forEach(element => {
  element.lenghts.short((a, b) => a - b)
})

console.log(words2);