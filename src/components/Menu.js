import Nav from "./Nav";
import Logo from "./UI/svgs/Logo";
import SocialSVG from "./UI/svgs/SocialSVG";

const Menu = ({ msgUnity, sceneState, setSceneState }) => {
  return (
    <div>
      <Logo />
      <Nav />
      {/* <SocialSVG />  */}
    </div>
  );
};

export default Menu;
