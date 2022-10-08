//👇 Magical keyword
async function kitchen() {
  try {
    // Let's create a fake problem
    await abc;
  } catch (error) {
    console.log("abc does not exist", error);
  } finally {
    console.log("Runs code anyways");
  }
}

kitchen(); // run the code
