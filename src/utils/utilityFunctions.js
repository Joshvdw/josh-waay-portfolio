let hasVisited = false;

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

export { isTouchDevice, playLottie, customLogStatement };
