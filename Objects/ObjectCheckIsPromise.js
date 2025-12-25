// How do you check an object is a promise or not

function isPromise(object){
    if(Promise && Promise.resolve){
    return Promise.resolve(object) == object;
    }else{
    throw "Promise not supported in your environment"
    }
 }

 var i = 1;
 var promise = new Promise(function(resolve,reject){
    resolve()
 });

 console.log(isPromise(i)); // false
 console.log(isPromise(promise)); // true


 ////////////////////////////////////////////////////////////////

 function isPromiseThen(value) {
    return Boolean(value && typeof value.then === 'function');
 }
 var i = 1;
 var promise = new Promise(function(resolve,reject){
    resolve()
 });
 
 console.log(isPromiseThen(i)) // false
 console.log(isPromiseThen(promise)); // true