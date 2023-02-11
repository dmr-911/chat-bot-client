import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCredentials from "../../hooks/useCredentials";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage from "../../hooks/useLocalStorage";

const Login = () => {
  const location = useLocation();
  const destination = location?.state?.from || "/";
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  // useCredentials
  const { user, login, errors, userData } = useCredentials();

  // formik
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    login(values.email, values.password);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // Error toast
  const notify = (error) => toast.error(error);
  useEffect(() => {
    if (errors.length) {
      errors.forEach((error) => notify(error));
    }
  }, [errors]);

  // user checking
  useEffect(() => {
    userData(accessToken);
  }, [user?.username]);

  if (user?.username) {
    return <Navigate to={destination} />;
  }

  return (
    <section className="bg-body md:py-16 h-full relative p-4">
      {/* main chat section */}
      <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
        {/* component */}
        <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[660px] overflow-hidden">
          <div className="relative flex flex-col justify-center h-full overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md">
              <h1 className="text-3xl font-semibold text-center text-[#3E8A5F] underline">
                Sign In
              </h1>
              <form className="mt-6" onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none focus:bg-green-600"
                  >
                    Login
                  </button>
                </div>
                <p className="mt-4">
                  Don't have account?{" "}
                  <NavLink
                    to="/signup"
                    style={{ textDecoration: "underline", color: "#3E8A5F" }}
                  >
                    Signup
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={true} />
    </section>
  );
};

export default Login;
