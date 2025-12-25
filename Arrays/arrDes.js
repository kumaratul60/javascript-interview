const arr = [1,2,3]
const [,x,y]= arr
console.log(x,y); //2,3

const [a,b]= arr
console.log(a,b); //1,2



const props = [
    { id: 1, name: 'John'},
    { id: 2, name: 'Jack'},
    { id: 3, name: 'Tom'}
  ];
  
  const [,, { name }] = props;
  console.log(name);// tom


  const [p, ...q] = [1, 2, 3, 4];
console.log(p, q);