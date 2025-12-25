const templateString = "My name is {{name}}";
const dataJson = { name: "atul" };

function interpolateString(templateString, dataJson) {
  let interpolatedString = templateString;

  for (const key in dataJson) {
    if (dataJson.hasOwnProperty(key)) {
      const placeholder = `{{${key}}}`;
      const value = dataJson[key];
      interpolatedString = interpolatedString.replace(placeholder, value);
    }
  }

  return interpolatedString;
}

// using regex

function interpolateStringRegex(templateString, dataJson) {
  return templateString.replace(/{{(.*?)}}/g, (match, p1) => {
    const key = p1.trim();
    return dataJson[key] || "";

    //   if need for remove extra space like if input is "  atul  " then
    //  return (dataJson[key] || "").trim();
  });
}

const interpolatedString = interpolateString(templateString, dataJson);
console.log(interpolatedString); // Output: My name is atul

const interpolatedStringRegex = interpolateStringRegex(
  templateString,
  dataJson
);
console.log(interpolatedStringRegex); // Output: My name is atul
