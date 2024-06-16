import React from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/LogoutContainer";

const LogoutContainer = () => {
  const [showLogout, setshowLogout] = useState(false);
  const data = useDashboardContext();
  console.log(data);
  console.log(data.avatar);
  return (
    <Wrapper>
      <button
        className="btn logout-btn"
        onClick={() => setshowLogout(!showLogout)}
      >
        {data.user.avatar ? (
          <img src={data.user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}
        {data.user.name} <FaCaretDown />
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
