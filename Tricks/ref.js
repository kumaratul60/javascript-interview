const theObject = {
  theValue: 3,
};

const theOtherObj = theObject;

theOtherObj.theValue++;

console.log(theOtherObj.theValue);
// Result: 4

console.log(theObject.theValue);
// Result: 4

/*
When a reference value is assigned from one variable to another, the JavaScript engine creates a copy of that reference value — not the object value itself, the way a discrete copy is made of a primitive value. Both identifiers point to the same object in memory — any changes made to that object by way of one reference will be reflected by the others, because they’re all referencing the same thing:
*/

//https://piccalil.li/blog/date-is-out-and-temporal-is-in/
