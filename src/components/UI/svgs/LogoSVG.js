const Logo = ({ isPreloader }) => {
  return (
    <div className={`logo ${isPreloader ? "flex-centre" : ""}`}>
      <img src="/svg/josh_waay_logo.svg" alt="Josh Waay Logo" />
    </div>
  );
};

export default Logo;
