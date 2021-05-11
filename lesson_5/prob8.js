let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

let objArr = Object.entries(obj);
let allVowels = [];
const vowels = 'aeiou';
objArr.forEach(element => {
  element[1].forEach(str => {
    let letters = str.split('');
    letters.forEach(vowel => {
      if (vowels.includes(vowel))
        allVowels.push(vowel);
      
        
    })

  })
});
console.log(allVowels.join(''));