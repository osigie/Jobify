import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import Logo from "./Logo";
import { useState } from "react";
const Navbar = () => {
  const { toggleSideBarFunc, logOut, user } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSideBarFunc}>
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <Logo />
          <h3>Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" onClick={logOut} className="dropdown-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
