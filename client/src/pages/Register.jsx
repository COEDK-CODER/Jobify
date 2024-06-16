import React from "react";
import { Link, redirect, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async (request) => {
  const formData = await request.request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message[0]);
    return error;
  }
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
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
          name="lastName"
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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Already a memeber?{" "}
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </Wrapper>
  );
};

export default Register;
