const ms = 24 * 60 * 60 * 1000;
const res = [0, 1, 2, 3, 4, 5, 6].map(
  (days) => new Date(Date.now() - ms + days)
);
console.log(res);
