//  input -> console.log(computeAmount().lacs(15).crore(5).lacs(20).thousand(45).crore(7).value())
// output -> 123545000

// input -> calc.add(10).multiply(5).subtract(30).add(10);
// output -> 30

const calc1 = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  subtract(b) {
    this.total -= b;
    return this;
  },
  multiply(c) {
    this.total *= c;
    return this;
  },
  value() {
    return this.total;
  },
};

const calc2 = {
  total: 0,
  add(a) {
    this.total += a;
    return this;
  },
  subtract(b) {
    this.total -= b;
    return this;
  },
  multiply(c) {
    this.total *= c;
    return this;
  },
};

function calc() {
  let total = 0;
  return {
    add: function (a) {
      total += a;
      return this;
    },
    subtract: function (a) {
      total -= a;
      return this;
    },
    multiply: function (a) {
      total *= a;
      return this;
    },
    value: function () {
      return total;
    },
  };
}

const HUNDRAD = 100;
const THOUSAND = HUNDRAD * 10;
const LACS = THOUSAND * HUNDRAD;
const CRORE = LACS * HUNDRAD;

function computeAmount() {
  let result = 0;
  return {
    thousand: function (n) {
      result += n * THOUSAND;
      return this;
    },
    lacs: function (n) {
      result += n * LACS;
      return this;
    },
    crore: function (n) {
      result += n * CRORE;
      return this;
    },
    value: function () {
      return result;
    },
  };
}

const res1 = calc1.add(10).multiply(5).subtract(30).add(20).value();
console.log(res1);
const res2 = calc2.add(10).multiply(5).subtract(30).add(20);
console.log(res2.total);
const res = calc().add(10).multiply(5).subtract(30).add(20).value();
console.log(res);

const munsiOutput = computeAmount().lacs(15).crore(5).lacs(20).thousand(45).crore(7).value();
console.log(munsiOutput, "::munsiOutput");
