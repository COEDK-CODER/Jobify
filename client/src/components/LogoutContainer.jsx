import React from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";

const LogoutContainer = () => {
  const [showLogout, setshowLogout] = useState(false);
  const data = useDashboardContext();
  console.log(data.user.name);

  return (
    <Wrapper>
      <button
        className="btn btn-logout"
        onClick={() => setshowLogout(!showLogout)}
      >
        <FaUserCircle /> {data.user.name} <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button
          type="button"
          className="dropdown-btn"
          onClick={data.logoutUser}
        >
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
