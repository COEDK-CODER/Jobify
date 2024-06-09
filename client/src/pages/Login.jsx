import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";

const Login = () => {
  return (
    <Wrapper>
      <form action="" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          labelName="Email"
          inputType="email"
          id="email"
          name="email"
          defaultValue="dinesh@gmail.com"
        />
        <FormRow
          labelName="Password"
          inputType="password"
          id="password"
          name="password"
          defaultValue="Password.123"
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        <p>
          New memeber?{" "}
          <Link to="/register" className="member-btn">
            Login
          </Link>
        </p>
      </form>
      <div>
        <Link to="/login">Register</Link>
      </div>
    </Wrapper>
  );
};

export default Login;
