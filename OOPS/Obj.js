const person = {
    name: 'Brendan Eich',
    age: 60,
    address: {
      street: '123 JavaScript Street',
      city: 'Web',
      state: 'Programming',
      zip: '12345'
    }
  };
  console.log(person.name); // Output: 'Brendan Eich'
console.log(person['age']); // Output: 60
console.log(person.address.city); // Output: 'Web'