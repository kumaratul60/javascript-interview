let arr = [2,3,4,6,8,9,12,14,16,18,21]
let dby2 = [];
let dby3 = [];

const op1 = arr.filter(val=>{
    return val%3==0
})
console.log(op1)
const op2 = arr.filter(val=>{
    return val%2==0
})
console.log(op2)