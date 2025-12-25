function reverseStr(str) {
  ////////////////////////////////
  // const m1 = str.split("").reverse().join();
  // console.log(m1);
  //////////////////////////////////////
  // let rev = "";
  // for (let i = str.length - 1; i >= 0; i--) {
  //   rev += str[i];
  //   // console.log(rev);
  //   //  console.log(i);
  //   //  console.log(str[i]);
  // }
  // console.log(rev);
  ////////////////////////////////////////////////////////////////
  //   let rev = "";
  //   for (let i = 0; i <= str.length - 1; i++) {
  //     rev = str[i] + rev;
  //   }
  //    console.log(rev);
  //////////////////////////////////////
  // let rev = "";
  // for (let char of str) {
  //   rev = char + str;
  // }
  // console.log(rev);
  //////////////////////////////////////////
  // let rev = "";
  // str.split("").forEach(function (char) {
  //   // rev += char;
  //   rev = char + str;
  // });
  // console.log(rev);
  //////////////////////////////////////////
  let rev = "";
  str.split("").forEach(
    (char) =>
      // rev += char;
      (rev = char + str)
  );
  console.log(rev);
  /////////////////////////
}

reverseStr("hello");
