function getUser() {
  const isError = false;
  asasasa;
  return new Promise((res, rej) => {
    if (isError) rej('Bad Input');
    res({ id: 1, name: 'Atul' });
  });
}

// const mainUserCall = async () => {
//   // try {
//   //   const user = await getUser()
//   //     .catch(() => console.log('Error'))
//   //     .finally(() => console.log('Done'));
//   //   console.log({ user });
//   // } catch (e) {
//   //   console.log('tryCatch', e);
//   // }
//   //////////

//   // try catch is messy if i want to use my user console outside try catch
//   let user;
//   try {
//     user = await getUser()
//       .catch(() => console.log('Error'))
//       .finally(() => console.log('Done'));
//     console.log({ user });
//   } catch (e) {
//     console.log('tryCatch');
//   }
//   console.log({ user });
// };

//  mainUserCall();

const mainUserCallTry = async () => {
  const user = await Promise.try(getUser).catch(() => console.log('Error').finally(() => console.log('done')));
  console.log({ user });
};

mainUserCallTry();
