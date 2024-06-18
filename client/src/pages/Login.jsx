import React from "react";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";
import FormRow from "../components/FormRow";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch("/users/current-user");
    return data;
  } catch (error) {
    console.log(error);
    return redirect("/");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    const data1 = await customFetch.post("/auth/login", data);
    console.log(data1);
    toast.success("logged in");
    return redirect("/dashboard");
  } catch (error) {
    toast.warning("Invalid Credentials");
    console.log(error);
    return error;
  }
};
const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async () => {
    const data = {
      email: "test@gmail.com",
      password: "password",
    };
    try {
      const data1 = await customFetch.post("/auth/login", data);
      console.log(data1);
      toast.success("Take a test drive");
      navigate("/dashboard");
    } catch (error) {}
  };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow labelName="Email" inputType="email" id="email" name="email" />
        <FormRow
          labelName="Password"
          inputType="password"
          id="password"
          name="password"
        />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Logging In..." : "Login"}
        </button>
        {/* <button type="submit" className="btn btn-block" onClick={loginDemoUser}>
          Explore the App
        </button> */}
        <p>
          New memeber?{" "}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
      <div>
        <Link to="/login">Register</Link>
      </div>
    </Wrapper>
  );
};

export default Login;
