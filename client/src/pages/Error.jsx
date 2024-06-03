import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      Page Not Found
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Error;
