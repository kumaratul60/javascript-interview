// Given an array of objects of items in cart, print:

// the total No. of items
// the total cart value
// the total discounted value(sum of dicounted values on each item) based on the given discount
// total tax amount (18% tax, calculated on total cart value)

const cartItems = [
  {
    id: "101",
    name: "Oreo",
    count: 2,
    price: 30.0,
    discount: 0.18,
  },
  {
    id: "102",
    name: "Red Bull",
    count: 1,
    price: 99.0,
    discount: 0.15,
  },
  {
    id: "103",
    name: "Dairy Milk Silk",
    count: 3,
    price: 175.0,
    discount: 0.05,
  },
  {
    id: "104",
    name: "Pulse Candy Pack",
    count: 1,
    price: 135.0,
    discount: 0.2,
  },
];

function output(arr) {
  console.log(arr.length, " Prodcts in cart");
  let total = 0;
  let totaldiscout = 0;

  function discounted(price, disco) {
    let discountinfo = { value: 0, fprice: 0 };
    discountinfo.value = price * disco;
    discountinfo.fprice = price - price * disco;

    return discountinfo;
  }

  cartItems.map((item) => {
    total = total + item.price;
    totaldiscout = totaldiscout + discounted(item.price, item.discount).value;
    console.log(
      "discounted amount " +
        discounted(item.price, item.discount).value +
        " discounted Price " +
        discounted(item.price, item.discount).fprice
    );
  });
  console.log("total " + total);
  console.log("total taxed " + total * 1.18);
  console.log("total Discount " + totaldiscout);
  console.log("to be paid " + (Number(total * 1.18) - Number(totaldiscout)));
}

output(cartItems);
