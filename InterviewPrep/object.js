const person1 = {  
    name: 'Saurabh',  
    address: {    
            city: 'Delhi',    
            state: 'Delhi'  
            }
    }

const person2 = person1;
const person3 = { ...person1 }

person2.name = 'Person2';

person3.address.city = 'Mumbai';


console.log(person1);
console.log(person2);
console.log(person3);