const API_URL = "https://api.github.com/users/kumaratul60";

/**
how fetch works?

fetch() => return a promise that resolves and get a response object which has body that is a readable stream.
Now you have to convert this readable stream into a json, which is also a promise to resolve it you get value or result so you do like:

fetch => Response.json => jsonValue or result

//
1) fetch(url, options).then((response)=> response.json())
2) then we can use the data in our code
3) if there is any error while fetching it will throw an exception and catch block will execute
4) finally block will always run irrespective of success or failure

*/

async function handleFetch() {
  try {
    const fetchData = await fetch(API_URL);
    const responsevalue = await fetchData.json();
    console.log({ responsevalue });
  } catch (err) {
    console.log({ err });
  }

  //  or
  //  fetch(API_URL).then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))
}
// the oleder way of catching error if you using try/catch: handleFetch().catch(err=>console.log(err))

handleFetch();
