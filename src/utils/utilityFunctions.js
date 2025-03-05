let hasVisited = false;
let gyroEnabled = false;

function isTouchDevice() {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent.toLowerCase();

    const isMobile =
      /iPhone|android|ipod|blackberry|bada|windows phone|palm|symbian|sch-i800|playbook|tablet|kindle|nook|samsung|lg|webos|seri0|viera|smarttv|philips|panasonic|opera mini|meego|cros/.test(
        userAgent
      );

    const isTablet =
      /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP)))|xoom|sch-i800|opera mini|tablet|nook|device|mobile|touch)/.test(
        userAgent
      );

    const hasTouchEvents =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    return isMobile || isTablet || hasTouchEvents;
  }
}

function playLottie(start, end, animation) {
  return animation.playSegments([start, end], true);
}

function getMobileContentHeight() {
  const laptopSpacer = document.querySelector(".laptop-spacer");
  const workBodyLeft = document.querySelector(".work-body__left");
  const workBodyRight = document.querySelector(".work-body__right");

  if (!laptopSpacer || !workBodyLeft || !workBodyRight) {
    return 0;
  }

  // Force a reflow to get updated heights
  const combinedHeight =
    laptopSpacer.offsetHeight +
    workBodyLeft.offsetHeight +
    workBodyRight.offsetHeight;

  return combinedHeight;
}

function isIOSDevice() {
  if (typeof navigator !== "undefined") {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  return false;
}

async function enableGyro() {
  // Only iOS devices need explicit permission
  if (!isIOSDevice()) {
    return;
  }
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    try {
      await DeviceMotionEvent.requestPermission();
    } catch (error) {
      console.error("Error requesting gyro permission:", error);
    }
  }
}

function customLogStatement() {
  if (!hasVisited) {
    console.log(
      `
      ▗▖ ▗▖▗▄▄▄▖    ▗▄▄▄▖▗▖ ▗▖▗▄▄▄▖▗▄▄▖ ▗▄▄▄▖
      ▐▌ ▐▌  █        █  ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌   
      ▐▛▀▜▌  █        █  ▐▛▀▜▌▐▛▀▀▘▐▛▀▚▖▐▛▀▀▘
      ▐▌ ▐▌▗▄█▄▖      █  ▐▌ ▐▌▐▙▄▄▖▐▌ ▐▌▐▙▄▄▖
                                                                                    
      Welcome to my website! 

      If you would like to check out the code, please see: https://github.com/Joshvdw/josh-waay-portfolio
    `
    );
  }
  hasVisited = true;
}

export {
  isTouchDevice,
  playLottie,
  getMobileContentHeight,
  customLogStatement,
  enableGyro,
};
