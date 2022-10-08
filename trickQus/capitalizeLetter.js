function capitalizeLetter(str) {
  const strArr = str.toLowerCase().split(" ");
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] =
      strArr[i].substring(0, 1).toUpperCase() + strArr[i].substring(1);
  }
  // console.log(strArr.join(" "));
  return strArr.join(" ");
  //   //////////////////////////////////////////////////////////
  //   return str.replace(/\b[a-z]/gi, function (char) {
  //     // g -> global
  //     //  i-> case sencitive
  //     return char.toUpperCase();
  //   });
  /////////////////////////////////////////////////////
}

const output = capitalizeLetter("i love javAScript ");
console.log(output);
