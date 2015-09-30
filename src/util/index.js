export default (myArray, keysToCheck, subStr) => {
  var re = new RegExp(subStr.toString().toLowerCase());

  return myArray.filter((curEl) => {
    for(var i = 0; i < keysToCheck.length; i++) {
      if (re.test(curEl[keysToCheck[i]].toString().toLowerCase())) {
        return true;
      }
    }

    return false
  });

};
