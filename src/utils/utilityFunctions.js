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

  const combinedHeight =
    (laptopSpacer ? laptopSpacer.offsetHeight : 0) +
    (workBodyLeft ? workBodyLeft.offsetHeight : 0) +
    (workBodyRight ? workBodyRight.offsetHeight : 0);

  return combinedHeight;
}

function isIOSDevice() {
  if (typeof navigator !== "undefined") {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  return false;
}

async function enableGyro() {
  console.log("enableGyro called");

  // Only iOS devices need explicit permission
  if (!isIOSDevice()) {
    console.log("Not an iOS device - no permission needed");
    return;
  }

  // iOS 13+ requires explicit permission
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    try {
      console.log("Requesting gyro permission...");
      const permission = await DeviceMotionEvent.requestPermission();
      console.log("Permission result:", permission);

      if (permission === "granted") {
        console.log("Gyro Permission Granted");
      } else {
        console.log("Gyro Permission Denied");
      }
    } catch (error) {
      console.error("Error requesting gyro permission:", error);
    }
  } else {
    console.log("iOS device but no permission request needed (pre-iOS 13)");
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
