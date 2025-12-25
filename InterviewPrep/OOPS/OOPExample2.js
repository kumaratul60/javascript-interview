const studentDetails = [
    {
      roll: "1",
      name: "Rohan Singh",
      maths: 86,
      science: 90,
      english: 75,
      computer: 85
    },
    {
      roll: "2",
      name: "Ritvik Patel",
      maths: 27,
      science: 30,
      english: 35,
      computer: 30
    },
    {
      roll: "3",
      name: "Neha Maurya",
      maths: 75,
      science: 69,
      english: 40,
      computer: 75
    },
    {
      roll: "4",
      name: "Mohit Verma",
      maths: 21,
      science: 31,
      english: 45,
      computer: 40
    },
    {
      roll: "5",
      name: "Karan Trivedi",
      maths: 70,
      science: 80,
      english: 35,
      computer: 60
    }
  ];
  
  let studentres = []
  let highest = 0
  let lowest = Infinity
  let totalcomp = 0
  let grade
  studentDetails.map((item) =>{
  
    if(Number(item.maths + item.science + item.english + item.computer)>300){
      grade = "A"
    }else if(Number(item.maths + item.science + item.english + item.computer)<=240){
      grade = "B"
    }else if(Number(item.maths + item.science + item.english + item.computer)>=140){
      grade = "C"
    }else{
      grade = "D"
    }
  
  totalcomp = totalcomp + item.computer;
    studentres.push({
      name: item.name, 
      total: Number(item.maths + item.science + item.english + item.computer), 
      roll: Number(item.roll),
      Grade: grade
      }
  )
  }
  )
  
  studentres.map((studs)=>{
    
  if(studs.total> highest){
   highest = studs.total
  }if(studs.total<lowest)
    lowest = studs.total
  })
    console.log(studentres)
    console.log(highest)
    console.log(lowest)
    console.log(totalcomp/studentDetails.length)