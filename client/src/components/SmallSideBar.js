import Wrapper from "../assets/wrappers/SmallSidebar";

import { useAppContext } from "../context/AppContext";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Navlinks from "./Navlinks";

const SmallSideBar = () => {
  const { toggleSideBarFunc, showSideBar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={toggleSideBarFunc}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks toggleSideBarFunc={toggleSideBarFunc} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
