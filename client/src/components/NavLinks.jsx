import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  const data = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((x) => {
        if (data.user.role != "admin" && x.path === "admin") {
          return;
        }
        return (
          <NavLink
            to={x.path}
            key={x.text}
            className="nav-link"
            onClick={props.isBigSidebar ? null : data.toggleSidebar}
          >
            <span className="icon">{x.icon}</span> {x.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
