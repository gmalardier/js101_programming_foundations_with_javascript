let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

let munstersArr = Object.entries(munsters);
console.log(munstersArr);

munstersArr.forEach(element => {
  console.log(`${element[0]} is a ${element[1].age}-year-old ${element[1].gender}.`)
});
