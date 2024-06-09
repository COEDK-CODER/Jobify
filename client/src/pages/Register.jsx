import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";

const Register = () => {
  return (
    <Wrapper>
      <form action="" className="form">
        <Logo />
        <h4>Register</h4>

        <FormRow
          labelName="Name"
          inputType="text"
          id="name"
          name="name"
          defaultValue="Dinesh"
        />
        <FormRow
          labelName="Last Name"
          inputType="text"
          id="lastname"
          name="lastname"
          defaultValue="kumar"
        />
        <FormRow
          labelName="Location"
          inputType="text"
          id="location"
          name="location"
          defaultValue="Hyderabad"
        />
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
          Submit
        </button>
        <p>
          Already a memeber?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </Wrapper>
  );
};

export default Register;
