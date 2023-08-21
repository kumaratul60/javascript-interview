//  Implicit and Explicit Binding

var obj = {
  name: "Atul",
  //   display: () => {
  //     console.log(this.name);
  //   },
  display: function () {
    console.log(this.name);
  },
};
var obj1 = {
  name: "abc",
};
obj.display();
obj.display.call(obj1);
