function kitchen(){

    return new Promise ((resolve, reject)=>{
      if(true){
         resolve("promise is fulfilled")
      }
  
      else{
          reject("error caught here")
      }
    })
  }
  
  kitchen()  // run the code
  .then()    // next step
  .then()    // next step
  .catch()   // error caught here
  .finally() // end of the promise [optional]