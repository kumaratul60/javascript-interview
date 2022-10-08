// 1.Random HEX color
const hexColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

// 2. Difference between two dates
const dif = (d1, d2) =>
  Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000);

dif(new Date("2006-02-24"), new Date("2022-02-24"));

// 3. Get user-selected text -> Returns the selected text.
const getSelectedText = () => window.getSelection().toString();

// 4. Detect dark mode -> Returns true when dark mode is enabled.
const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

// 5. Scroll to Top -> Scroll to the top of the page.

const scrollToTop = () => window.scroll(0, 0);

// 6. Random Boolean -> Generate a random boolean.
const randomBool = () => Math.random() >= 0.5;

randomBool(); //true

// 7. Toggle Boolean -> Toggling boolean, turning true to false or vice versa.

const toggleBool = (val) => (val = !val);

toggleBool(false); //true
