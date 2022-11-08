const prevElm = document.getElementById("preview");
const button = document.querySelector("button");

button.addEventListener("click", async () => {
  //   const options = {
  //     video: {
  //       cursor: "always", //show the cursor
  //     },
  //     audio: false, // don't record audio
  //   };
  //   prevElm.srcObject = await navigator.mediaDevices.getDisplayMedia(options);

  prevElm.srcObject = await navigator.mediaDevices.getDisplayMedia({
    video: {
      cursor: "always", //show the cursor
    },
    audio: false,
  });
});
