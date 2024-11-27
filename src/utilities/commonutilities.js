function convertKeysToLowerCaseInArray(arrayOfObjects) {
  return arrayOfObjects.map((obj) => {
    const newObj = {};
    for (const key in obj) {
      const newKey = key.toLowerCase();
      newObj[newKey] = obj[key];
    }
    return newObj;
  });
}

function addIdToObjects(arrayOfObjects) {
  var newArray = [];
  for (var i = 0; i < arrayOfObjects.length; i++) {
    var obj = arrayOfObjects[i];
    var newObj = {};
    newObj.id = i + 1;
    newObj.isEdited = false
    for (var key in obj) {
      newObj[key] = obj[key];
    }
    newArray.push(newObj);
  }
  return newArray;
}

export { convertKeysToLowerCaseInArray, addIdToObjects };
