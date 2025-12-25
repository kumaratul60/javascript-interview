const ben = {
  name: "ben",
  talk() {
    return `Hi I'm ${this.name}`
  }
}


const jen = {
  name: "jen",
  talk() {
    return `Hi I'm ${this.name}`
  }
}

console.log(jen.talk, ben.talk());
