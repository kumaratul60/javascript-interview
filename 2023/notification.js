const names = [
  "Saanvi",
  "Anya",
  "Aadhya",
  "Aaradhya",
  "Ananya",
  "Pari",
  "Anika",
  "Navya",
  "Angel",
  "Diya",
  "Myra",
  "Sara",
];

const notifications = document.querySelector(".notifications");
const removeToast = (myToast) => {
  notifications.innerHTML = "";
};
const createToast = () => {
  const myToast = document.createElement("p");
  const randomName = names[Math.floor(Math.random() * names.length)];
  const displayText = `${randomName} enrolled in 'Namaste React WebSeries', ${Math.floor(
    Math.random() * 30
  )} mins ago.`;

  // myToast ko class 2 classess diye
  myToast.className = "myToast success";
  myToast.innerHTML = `<div class="toastText">
             <span>${displayText}</span>
           </div>`;
  notifications.appendChild(myToast);
  myToast.timeoutId = setTimeout(() => removeToast(myToast), 5000);
};
window.onload = () => {
  setInterval(() => createToast(), 15000);
};
// })();
