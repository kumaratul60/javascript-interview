// Create a new Date object representing the current date and time
let myDate = new Date();

// Log the entire Date object
console.log("Current Date and Time:", myDate);

// Get the day of the month (1-31)
console.log("Day of the Month:", myDate.getDate());

// Get the day of the week (0-6, where 0 represents Sunday)
console.log("Day of the Week:", myDate.getDay());

// Get the year
console.log("Year:", myDate.getFullYear());

// Convert the Date object to its string representation
console.log("String Representation:", myDate.toString());

// Convert the Date object to a human-readable date string
console.log("Human-Readable Date String:", myDate.toDateString());

// Convert the Date object to a local time string
console.log("Local Time String:", myDate.toLocaleString());

// Convert the Date object to a local date string
console.log("Local Date String:", myDate.toLocaleDateString());

// Get the data type of the Date object
console.log("Data Type of myDate:", typeof myDate);

/**
create specific date
 */
// Create a Date object representing "2023-01-01"
let myCreatedDate = new Date("2023-01-01");

// Create a Date object representing "01-05-2024 12:52:56"
let myCreatedInDate = new Date("01-05-2024 12:52:56");

// Create a Date object representing January 12, 2023
let myNewDate = new Date(2023, 0, 12); // Note: Month starts from 0 in JavaScript

// Create a Date object representing February 25, 2033, 05:09:06
let myDateTime = new Date(2033, 1, 25, 5, 9, 6);

// Display the created date as a formatted string
console.log(myCreatedDate.toDateString());

// Display the created date and time using the system's locale
console.log(myCreatedInDate.toLocaleString());

// Display the new date as a formatted string
console.log(myNewDate.toDateString());

// Display the new date and time using the system's locale
console.log(myDateTime.toLocaleString());

/**
 *
 */
let myTimeStamp = Date.now();

// Convert milliseconds to seconds
let seconds = Math.floor(myTimeStamp / 1000);

// Convert seconds to minutes
let minutes = Math.floor(seconds / 60);

// Convert minutes to hours
let hours = Math.floor(minutes / 60);

// Get the current date and time
let currentDate = new Date(myTimeStamp);

console.log({
  myTimeStamp,
  seconds,
  minutes,
  hours,
  currentDate,
});


const dateCustomization = new Date();

const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
};

const formattedDate = dateCustomization.toLocaleString('en-IN', options);  //"en-US"
console.log({formattedDate});