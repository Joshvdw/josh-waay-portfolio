import Logo from "./UI/svgs/Logo";
import PreloaderLottie from "./UI/lotties/PreloaderLottie";

const Preloader = () => {

  return (
    <div className="preloader-wrapper">
      LOADING...
      <PreloaderLottie />
      <Logo />
    </div>
  );
};

export default Preloader;
