function filteroutFalsyvalues() {
  const arr = [1, 2, "", 3, 4, false, 5, 6, undefined, 7, 8, NaN, 0];
  const output = arr.filter(Boolean);
  console.log(output);
}
filteroutFalsyvalues();
