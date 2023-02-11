import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import FormikControl from "./formik/formikControl";
import ProfileLayout from "./ProfileLayout";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const EditProfile = () => {
  const { user, userData } = useAuth();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const location = useLocation();
  console.log(location.pathname);

  // Toast
  const notify = () => toast.success("Profile updated");

  // formik
  const initialValues = {
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.username,
    phone_number: user?.phone_number,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name required!"),
    last_name: Yup.string().required("Last name required!"),
    // email: Yup.string().email("Invalid email").required("Email required!"),
    phone_number: Yup.string(),
  });

  const onSubmit = (values) => {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios
      .patch(
        `users/${user.id}/`,
        {
          first_name: values.first_name,
          last_name: values.last_name,
          phone_number: values.phone_number,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          notify();
          userData(accessToken, location.pathname);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <ProfileLayout>
      <section className="flex flex-col text-left px-4 md:px-32 my-24">
        <h1 className="text-center text-3xl">Edit Profile</h1>
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
                  disabled
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone number"
                  name="phone_number"
                />

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none"
                  >
                    Save
                  </button>
                </div>
                {/* <button type="submit" disabled={!formik.isValid}>Submit</button> */}
              </Form>
            );
          }}
        </Formik>
        <Toaster position="top-center" reverseOrder={true} />
      </section>
    </ProfileLayout>
  );
};

export default EditProfile;
