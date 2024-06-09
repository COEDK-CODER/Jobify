import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState, useContext, createContext } from "react";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
const DashboardContext = createContext();

const DashboardLayout = (props) => {
  //temp
  const user = { name: "Dinesh" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(props.isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", !isDarkTheme);
    localStorage.setItem("darkTheme", !isDarkTheme);
  };
  const toggleSidebar = () => {
    console.log("show side bar");
    setShowSidebar(!showSidebar);
  };
  const logoutUser = async () => {
    console.log("user logged out");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        toggleDarkTheme,
        toggleSidebar,
        showSidebar,
        logoutUser,
        showSidebar,
        isDarkTheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default DashboardLayout;
