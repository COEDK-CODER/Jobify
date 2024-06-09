import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return error.status === 404 ? (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Page not found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to="/dashboard">Go Back</Link>
      </div>
    </Wrapper>
  ) : (
    <h3>Some thing went wrong</h3>
  );
};

export default Error;
