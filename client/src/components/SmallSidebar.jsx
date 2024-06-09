import React, { useContext } from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const data = useDashboardContext();
  console.log("dine");
  console.log(data.showSidebar);
  return (
    <Wrapper>
      <div
        className={
          data.showSidebar
            ? "sidebar-container show-sidebar"
            : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={data.toggleSidebar}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
            <NavLinks />
          </header>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
