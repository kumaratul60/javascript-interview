// Date and String Operations
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

const sMonth = new Date();
sMonth.setMonth((sMonth.getMonth() - 2) % 12);
const startMonth1 = sMonth.toLocaleString('default', { month: 'long' });
const eMonth = new Date(); eMonth.setMonth(eMonth.getMonth() + 9)
const endMonth1 = eMonth.toLocaleString('default', { month: 'long' });
console.log(startMonth1, endMonth1);

const date = new Date();
const year = new Date(date).getFullYear();
const firstMonthOfYear = new Date(year, 0, 1);
const lastMonthOfYear = new Date(date.getFullYear(), 11, 1);
const startMonth = firstMonthOfYear.toISOString().split("T")[0];
const endMonth = lastMonthOfYear.toISOString().split("T")[0];
console.log(startMonth, endMonth)

const sDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
let eDate = new Date();
eDate = new Date(eDate.setDate(eDate.getDate() + 1));
const startDate = sDate.toISOString().split("T")[0];
const endDate = eDate.toISOString().split("T")[0];
console.log(startDate, endDate)