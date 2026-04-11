// fix that bug

function fetchUser() {
  let user;
  setTimeout(() => {
    user = { name: 'Alex' };
  }, 1000);
  return user;
}
console.log(fetchUser());

// 1
function fetchUser1(cb) {
  setTimeout(() => {
    cb({ role: 123 });
  }, 1000);
}
fetchUser1((user) => console.log(user));

// 2
function fetchUse2() {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      res({ test: 'ui' });
    }, 1000);
  });
}
fetchUser2().then((user) => console.log(user));
