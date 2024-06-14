const Nav = ({ msgUnity }) => {
  const handleNavClick = (navItem) => {
    msgUnity(`Set${navItem}Scene`);
  };
  const handleControlClick = (msg) => {
    msgUnity(msg);
  };
  return (
    <div className="nav-wrapper">
      <div onClick={() => handleNavClick("Work")}>
        <button>Work</button>
      </div>
      <div onClick={() => handleNavClick("About")}>
        <button>About</button>
      </div>
      <div onClick={() => handleNavClick("Services")}>
        <button>Services</button>
      </div>
      <div onClick={() => handleNavClick("Music")}>
        <button>Music</button>
      </div>
      <div onClick={() => handleNavClick("Contact")}>
        <button>Contact</button>
      </div>

      <div onClick={() => handleControlClick("NextVideo")}>
        <button>Next</button>
      </div>
      <div onClick={() => handleControlClick("PreviousVideo")}>
        <button>Previous</button>
      </div>
      <div onClick={() => handleControlClick("PauseVideo")}>
        <button>Pause</button>
      </div>
      <div onClick={() => handleControlClick("PlayVideo")}>
        <button>Play</button>
      </div>
    </div>
  );
};

export default Nav;
