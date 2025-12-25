// Function to fetch data from an API
function fetchData(apiUrl) {
  return new Promise((resolve, reject) => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// Array of API URLs
const apiUrls = [
  "https://api.example.com/data1",
  "https://api.example.com/data2",
  "https://api.example.com/data3",
];

// Use Promise.all() to fetch data from multiple APIs
const promises = apiUrls.map((apiUrl) => fetchData(apiUrl));

Promise.all(promises)
  .then((results) => {
    // Handle the results from all the promises
    console.log("Data from all APIs:", results);
  })
  .catch((error) => {
    // Handle errors from any of the promises
    console.error("Error fetching data:", error);
  });

///async-await way

// Function to fetch data from an API using async/await
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// Array of API URLs
const apiUrl = [
  "https://api.example.com/data1",
  "https://api.example.com/data2",
  "https://api.example.com/data3",
];

// Using async/await with Promise.all
async function fetchDataFromAllAPIs() {
  try {
    // Use Promise.all with async/await to fetch data from multiple APIs
    const results = await Promise.all(
      apiUrl.map((apiUrls) => fetchData(apiUrls))
    );

    // Handle the results from all the promises
    console.log("Data from all APIs:", results);
  } catch (error) {
    // Handle errors from any of the promises
    console.error("Error fetching data:", error);
  }
}

// Call the async function
fetchDataFromAllAPIs();

////////////////////////////////////////////////////////////////

async function fetchDataFromMultipleSources() {
  try {
    // Make two fetch requests concurrently
    const response1 = fetch("https://api.example.com/data1");
    const response2 = fetch("https://api.example.com/data2");

    // Use Promise.all to wait for both requests to complete
    const [data1, data2] = await Promise.all(
      [response1, response2].map((response) => response.json())
    );

    // Handle the responses
    console.log("Data from API 1:", data1);
    console.log("Data from API 2:", data2);

    // Continue with the rest of your logic...
  } catch (error) {
    // Handle errors from either fetch request
    console.error("Error fetching data:", error);
  }
}

// Call the function
fetchDataFromMultipleSources();
