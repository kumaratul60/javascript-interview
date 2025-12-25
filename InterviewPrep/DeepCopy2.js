const cloneDeep = require("lodash.clonedeep");
const original = {
  var1: new Date(),
  var2: NaN,
  var3: undefined,
  var4: function () {},
  var5: false,
  var6: {
    name: "Noah",
  },
};
const DeepCopiedObject = cloneDeep(original);
DeepCopiedObject.var6.name = "Mike";
console.log(original.var6.name); //Output 'Noah'
