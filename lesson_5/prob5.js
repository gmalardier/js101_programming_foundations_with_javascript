let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let age = [];
let totalMunstersMaleAge = Object.entries(munsters);

totalMunstersMaleAge.map(obj => {
  if (obj[1].gender === 'male') {
    return age.push(obj[1].age);
  }
})
age = age.reduce((num, add) => num += add);
console.log(age);
