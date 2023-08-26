const str = "    Hello            ";
const str2 = "    OM    "

// console.log(str.trim().length)
// console.log(str2.trim().length)

String.prototype.myTrim = function () {
    const trimSpace = this.replace(/^\s+|\s+$/g, "").length
    // const trimSpace = this.trim().length
    console.log(`trimSpace: ${trimSpace}`);
};

str.myTrim()
str2.myTrim()

