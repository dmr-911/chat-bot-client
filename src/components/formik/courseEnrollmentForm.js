import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./formikControl";
import { FormControl } from "@mui/material";

const CourseEnrollmentForm = () => {
  const options = [
    { key: "Email", value: "emailmoc" },
    { key: "Telephone", value: "telephonemoc" },
  ];
  const dropdownOptions = [
    {key: 'select a value', value: ''},
    {key: 'Option 1', value: 'cOption 1'},
    {key: 'Option 2', value: 'cOption 2'},
    {key: 'Option 3', value: 'cOption 3'}
];
  const checkBoxOptions = [
    {key: 'Option 1', value: 'cOption 1'},
    {key: 'Option 2', value: 'cOption 2'},
    {key: 'Option 3', value: 'cOption 3'}
];
  const initialValues = {
    email: "",
    bio: "",
    course: "",
    skills: "",
    courseDate: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email required!"),
    bio: Yup.string().required('Bio required'),
    course: Yup.string().required('Required course'),
    courseDate: Yup.date().required('Required date').nullable()

  });

  const onSubmit = (values) => {
    // console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        {
            formik =>{
                // console.log(formik.isValid);
                return <Form>
                    <FormikControl
                    control = 'input'
                    type="email"
                    label="Email"
                    name="email"
                    />
                    <FormikControl
                    control="textarea"
                    label="Bio"
                    name="bio"
                    />
                    <FormikControl
                    control="select"
                    label="Course"
                    name="course"
                    options={dropdownOptions}
                    />
                    <FormikControl
                    control="checkbox"
                    label="Your skillset"
                    name="skills"
                    options={checkBoxOptions}
                    />
                    <FormControl
                    control="date"
                    label="Course date"
                    name="courseDate"
                    />
                    <button type="submit" disabled={!formik.isValid}>Submit</button>
                </Form>
            }
        }
    </Formik>
  );
};

export default CourseEnrollmentForm;
