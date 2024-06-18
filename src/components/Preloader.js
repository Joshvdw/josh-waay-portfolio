import Logo from "./UI/Logo";
import PreloaderLottie from "./UI/lotties/PreloaderLottie";

const Preloader = () => {
  return (
    <div className="preloader-wrapper">
      <PreloaderLottie />
      <Logo />
    </div>
  );
};

export default Preloader;
