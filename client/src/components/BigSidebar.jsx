import React from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {
  const data = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          data.showSidebar
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo></Logo>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
