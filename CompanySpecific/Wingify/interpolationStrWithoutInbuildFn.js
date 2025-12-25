// interpolation of string without using inbuild functions

function interpolateString(templateString, dataJson) {
  let interpolatedString = "";
  let currentKey = "";
  let isInsidePlaceholder = false;

  for (let i = 0; i < templateString.length; i++) {
    const char = templateString[i];

    if (char === "{" && templateString[i + 1] === "{") {
      isInsidePlaceholder = true;
      currentKey = "";
      i++; // Skip the next '{' character
    } else if (char === "}" && templateString[i + 1] === "}") {
      isInsidePlaceholder = false;
      interpolatedString += dataJson[currentKey] || "";
      currentKey = "";
      i++; // Skip the next '}' character
    } else {
      if (isInsidePlaceholder) {
        currentKey += char;
      } else {
        interpolatedString += char;
      }
    }
  }

  return interpolatedString;
}

const templateString = "My name is {{name}}";
const dataJson = { name: "atul" };

const interpolatedString = interpolateString(templateString, dataJson);
console.log(interpolatedString); // Output: My name is atul
