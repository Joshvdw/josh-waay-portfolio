const Nav = ({ msgUnity }) => {
  const handleNavClick = (navItem) => {
    msgUnity(`Set${navItem}Scene`);
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
    </div>
  );
};

export default Nav;
