let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let arr = Object.entries(obj);

let result = [];

arr.map(element => {
  if (element[1].type === 'fruit') {
    let fruit = element[1].colors;
    fruit = fruit.map(color => {
      return color.split('')[0].toUpperCase() + color.slice(1);
        })
    result.push(fruit);
  } else {
    let veggie = element[1].size;
    veggie = veggie.toUpperCase();
    result.push(veggie);
  }
  return element;
})

console.log(result);