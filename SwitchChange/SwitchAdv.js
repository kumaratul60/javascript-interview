const weekday = 3;
function mon() {
  console.log("monday");
}
function tue() {
  console.log("tuesday");
}

function wed() {
  console.log("wednesday");
}

// normal form of switch
switch (weekday) {
  case 1:
    mon();
    break;
  case 2:
    tue();
    break;
  case 3:
    wed();
    break;
}

// new form of switch

let cases = { 1: mon, 2: tue, 3: wed };
cases[weekday]();
