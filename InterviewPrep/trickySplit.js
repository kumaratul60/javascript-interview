// Split the string with comma and semicolon

const str = 'app,sam;vid ';
const res = str.split(',');
const finalRes = str.split(/[,;]/); // split accept regular expression, to use this we can break a string from multiple places
console.log({ res, finalRes });
