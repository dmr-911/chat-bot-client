import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./formikControl";

const FormikContainer = () => {
    const dropdownOptions = [
        {key: 'select an option', value: ''},
        {key: 'Option 1', value: 'option 1'},
        {key: 'Option 2', value: 'option 2'},
        {key: 'Option 3', value: 'option 3'}
    ];
    const radioOptions = [
        {key: 'select an option', value: ''},
        {key: 'Option 1', value: 'rOption 1'},
        {key: 'Option 2', value: 'rOption 2'},
        {key: 'Option 3', value: 'rOption 3'}
    ];
    const checkBoxOptions = [
        {key: 'Option 1', value: 'cOption 1'},
        {key: 'Option 2', value: 'cOption 2'},
        {key: 'Option 3', value: 'cOption 3'}
    ];

  const initialValues = {
    email: "",
    description: "",
    selectOption : "",
    radioOption: "",
    checkBoxOption: [],
    birthDate : null
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email required"),
    description: Yup.string().required("comment required"),
    selectOption: Yup.string().required("select an option"),
    radioOption: Yup.string().required("select an radio option"),
    checkBoxOption: Yup.array().required("select an check box option"),
    birthDate: Yup.date().required('Choose a date').nullable()
  });
  const onSubmit = (values) => {
    // console.log("form data", values);
    // console.log("saved data", JSON.parse(JSON.stringify(values)))
    };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="Description"
            name="description"
          />
          <FormikControl
          control="select"
          label=' select a topic'
          name= 'selectOption'
          options={dropdownOptions}
          />
          <FormikControl
          control="radio"
          label="Radio topic"
          name="radioOption"
          options={radioOptions}
          />
          <FormikControl
          control="checkbox"
          label="Check box topic"
          name="checkBoxOption"
          options={checkBoxOptions}
          />
          <FormikControl
          control="date"
          label="Pick a date"
          name="birthDate"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
