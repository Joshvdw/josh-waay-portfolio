import { animated } from "@react-spring/web";

const LinkSVG = ({ colourShifterLink }) => {
  return (
    <svg
      className="work-link__icon"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <animated.path
        d="M8.50905 0H5.83632V5.34755H8.50905H19.8793L1.89321 23.3294L2.84447e-05 25.2233L3.7864 29L5.67958 27.1061L23.6545 9.12425V20.4989V23.1727H29V20.4989V2.67377V0H26.3273H8.50905Z"
        fill="rgb(248, 247, 246)"
        style={colourShifterLink}
      />
    </svg>
  );
};

export default LinkSVG;
