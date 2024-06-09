import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaHome } from "react-icons/fa";
import { Logo } from "../components";
import { useDashboardContext } from "../pages/DashboardLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  console.log(toggleSidebar);
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <ThemeToggle />
        <div>
          <div className="btncontainer">
            <LogoutContainer />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
