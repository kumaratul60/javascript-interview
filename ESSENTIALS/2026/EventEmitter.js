/*
Implement an EventEmitter class that supports:

on(event, callback)
emit(event, data)
off(event, callback)
once(event, callback) (Bonus)

Similar to Node.js EventEmitter.

Ex:
Register Listener:
emitter.on("login", (user) => {
  console.log(`Welcome ${user}`);
});

Emit Event
emitter.emit("login", "Deval");


output: Welcome Deval


Remove Listener

const handler = (user) => {
  console.log(user);
};

emitter.on("login", handler);

emitter.off("login", handler);

Now:
emitter.emit("login", "Deval");
output: Nothing


Once:
emitter.once("login", (user) => {
  console.log(user);
});

emitter.emit("login", "Deval");
emitter.emit("login", "John");
output: Deval
*/
