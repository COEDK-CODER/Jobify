import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useDashboardContext } from "../pages/DashboardLayout";
import Wrapper from "../assets/wrappers/ThemeToggle";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  const data = useDashboardContext();
  console.log(isDarkTheme);
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  );
};

export default ThemeToggle;
