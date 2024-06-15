let inThrottle = false;

function handleScroll() {
  if (!inThrottle) {
    console.log("Scroll event triggered");
    inThrottle = true;
    setTimeout(() => {
      inThrottle = false;
    }, 1000);
  }
}
