const expr = "Papayas";

// create a function to handle the switch statement
const match = (expr, cases) => {
  // convert cases to an array
  const entries = Object.entries(cases);
  // get pattern and action from each entry
  for (const [pattern, action] of entries) {
    if (expr === pattern) {
      // if the action is function then it will be called
      // else return the action
      return typeof action === "function" ? action() : action;
    }
  }
  // return defult case
  return cases?.default;
};

// new way

const matched = match(expr, {
  Oranges: "Oranges are $0.59 a pound.",
  Mangoes: "Mangoes and papayas are $2.79 a pound.",
  Papayas: "Mangoes and papayas are $2.79 a pound.",
  default: `Sorry, we are out of ${expr}.`,
});

console.log(matched);
