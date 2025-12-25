const curr = new Date();
const checkMonday = new Date(
    curr.getTime() - ((curr.getDay() + 6) % 7) * 1000 * 60 * 60 * 24
);
const checkFriday = new Date(
    curr.getTime() - ((curr.getDay() + 2) % 7) * 1000 * 60 * 60 * 24
);
const mon = checkMonday.toISOString().split("T")[0];
const fry = checkFriday.toISOString().split("T")[0];

const sCheck = new Date(mon);
const eCheck = new Date(fry);
console.log(sCheck, eCheck);

//   const options: Intl.DateTimeFormatOptions = {
//     weekday: "long",
//   };

//   const startWeek = new Intl.DateTimeFormat("en-US", options).format(
//     sCheck
//   );
//   const endWeek = new Intl.DateTimeFormat("en-US", options).format(eCheck);
//   console.log(startWeek, endWeek)

const sMonth = new Date();
sMonth.setMonth((sMonth.getMonth() - 2) % 12);
const startMonth1 = sMonth.toLocaleString('default', { month: 'long' });

const eMonth = new Date(); eMonth.setMonth(eMonth.getMonth() + 9)
const endMonth1 = eMonth.toLocaleString('default', { month: 'long' });

console.log(startMonth1, endMonth1); // 
console.log(sMonth, eMonth);



// ///

const date = new Date();
const year = new Date(date).getFullYear();
const firstMonthOfYear = new Date(year, 0, 1);
const lastMonthOfYear = new Date(date.getFullYear(), 11, 1);
const startMonth = firstMonthOfYear.toISOString().split("T")[0];
const endMonth = lastMonthOfYear.toISOString().split("T")[0];

console.log(startMonth, endMonth)

const sDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
let eDate = new Date();
console.log(sDate, eDate)
// add one day to end date
eDate = new Date(eDate.setDate(eDate.getDate() + 1));
console.log(sDate, eDate)

const startDate = sDate.toISOString().split("T")[0];
const endDate = eDate.toISOString().split("T")[0];
console.log(startDate, endDate)

function convertDateType(date) {
    const reverseDate = date.split("-").reverse();
    const firstValue = reverseDate[0];
    reverseDate[0] = reverseDate[1];
    reverseDate[1] = firstValue;
    return reverseDate.join("/") + "GMT";
}

// convert the week type of response date
function convertWeekType(date) {
    const sWeek = new Date(date);
    let options = { weekday: "long" };
    const resWeek = new Intl.DateTimeFormat("en-US", options).format(sWeek);
    return resWeek;
}

// convert the month type of response date
function convertMonthType(date) {
    const sMonth = new Date(date);
    sMonth.setMonth(sMonth.getMonth() + 12);
    const resMonth = sMonth.toLocaleString("default", { month: "long" });
    return resMonth;
}
console.log(convertDateType(startDate))
console.log(convertWeekType(new Date()))
console.log(convertMonthType(startDate))

// Get the day of the year from a date
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))

const dayYer = dayOfYear(new Date()) 
console.log(dayYer);