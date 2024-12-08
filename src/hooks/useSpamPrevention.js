import { useState, useRef, useCallback } from "react";

export const useSpamPrevention = () => {
  const [isDisabled, setIsDisabled] = useState(false); // State to manage button disabled status
  const timeoutRef = useRef(null); // Ref to hold the timeout

  const preventSpam = useCallback(() => {
    // if (isDisabled) return; // Don't trigger if already disabled

    setIsDisabled(true); // Disable the button
    timeoutRef.current = setTimeout(() => {
      setIsDisabled(false); // Enable the button after 750ms
    }, 750);
  }, [isDisabled]);

  // Cleanup the timeout on component unmount
  const clearSpamTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return { isDisabled, preventSpam, clearSpamTimeout };
};
