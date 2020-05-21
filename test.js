let array1 = ['a', 'b', 'c', 'd'];
let array2 = ['b', 'a', 'c', 'd'];
let array3 = ['c', 'm', 'n', 'a'];

function getIntersection(array1, array2) {
  let newArray = [];
  for (let i = 0; i < array2.length; i++) {
    if (array1.find(item => array2[i] === item)) {
      newArray.push(array2[i]);
    }
  }
  return newArray;
}

const arrayGroup = [array1, array2, array3];
function getIntersection(arrayGroup) {
  return arrayGroup.reduce((acc, currentVal) => {
    if (acc.length === 0) {
      return currentVal;
    }

    let newArray = [];
    for (let i = 0; i < currentVal.length; i++) {
      if (acc.find(item => currentVal[i] === item)) {
        newArray.push(currentVal[i]);
      }
    }
    return newArray;
  }, []);
}

console.log(getIntersection(arrayGroup));
