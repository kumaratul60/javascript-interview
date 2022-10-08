// Bank Account (Object Oriented Programming in JavaScript)

// Create a class and define data members such as name, bank account number,
// account balance, account type, ifsc and name it as BankAccount.
// Create three Instances(three customers) of BankAccount with all necessary details.
// Print the name of customers and their account balances.
// Calculate the average account balance from all the instances.

class BankAccount {
  constructor(name, accountno, balance, type, ifsc) {
    this.name = name;
    this.accountno = accountno;
    this.balance = balance;
    this.type = type;
    this.ifsc = ifsc;

    this.info = function () {
      console.log(
        "name " +
          name +
          " no " +
          accountno +
          " balance " +
          Number(balance) +
          " accounttype " +
          type +
          "ifsc " +
          ifsc
      );
    };
  }
}

const custom1 = new BankAccount("ramesh", "1", "2433", "savings", "12341234");
const custom2 = new BankAccount("rajesh", "3", "233", "savings", "12341234");
const custom3 = new BankAccount("rasuresh", "2", "234", "savings", "12341234");

custom1.info();
custom2.info();
custom3.info();

console.log(avg());

function avg() {
  return (+custom1.balance + +custom2.balance + +custom3.balance) / 3;
}
