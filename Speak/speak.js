const synth = window.speechSynthesis;

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};

speak("Hello, world!");
