const getNumText = (num) => {
  switch (num) {
    case 1:
      return "One";
    case 2:
      return "Two";
    case 3:
      return "Three";
    default:
      return "Undefined";
  }
};

// By using an object...The Good Way:

const numberText = {
  1: "One",
  2: "Two",
  3: "Three",
};

const getNumTextAdv = (num) => numberText[num] || "Undefined";

const res = getNumText(1);
const res1 = getNumTextAdv(2);
console.log({ res, res1 });
