import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik/formikControl";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useCredentials from "../../hooks/useCredentials";

const SignUp = () => {
  // location trace
  const location = useLocation();
  const destination = location?.state?.from || "/";

  const { user, signUp } = useCredentials();

  // formik start
  const options = [
    { key: "Female", value: "female" },
    { key: "Male", value: "male" },
    { key: "Other", value: "other" },
  ];
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    sex: "",
    phone_number: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name required!"),
    last_name: Yup.string().required("Last name required!"),
    email: Yup.string().email("Invalid email").required("Email required!"),
    password: Yup.string().required("Password required!"),
    phone_number: Yup.string(),
    sex: Yup.string().required("Gender required!"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), ""], "Password don't match")
    //   .required("Required!"),
  });

  const onSubmit = (values) => {
    console.log(values);
    signUp(values);
  };

  // redirect
  if (user?.username || user?.first_name) {
    return <Navigate to={destination} />;
  }
  return (
    <>
      <section className="bg-body md:py-16 h-full relative p-4">
        {/* main chat section */}
        <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
          {/* component */}
          <div className="flex-1 p-6 justify-between flex flex-col h-auto">
            <div className="relative flex flex-col justify-center h-full">
              <div className="w-full p-6 m-auto bg-white rounded-md text-left">
                <h1 className="text-3xl font-semibold text-center text-[#3E8A5F] underline mb-4">
                  Sign Up
                </h1>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="input"
                          type="text"
                          label="First Name"
                          name="first_name"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Last Name"
                          name="last_name"
                        />
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Password"
                          name="password"
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Phone number"
                          name="phone_number"
                        />
                        <div className="text-center">
                          <FormikControl
                            control="radio"
                            label="Gender"
                            name="sex"
                            options={options}
                          />
                        </div>
                        <div className="mt-6">
                          <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none"
                          >
                            Sign up
                          </button>
                        </div>
                        {/* <button type="submit" disabled={!formik.isValid}>Submit</button> */}
                      </Form>
                    );
                  }}
                </Formik>
                <p className="text-center mt-4">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "underline", color: "#3E8A5F" }}
                  >
                    Sign In
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
