import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "../textError/textError";

const initialValues = {
  name: "Mizan",
  email: "iamprince999@gmail.com",
  channel: "Codevolution",
  comments: "asd",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "Mizan",
  email: "iamprince999@gmail.com",
  channel: "Codevolution",
  comments: "welcome to formik",
  address: "221b Baker street",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  // console.log("values", values);
  // console.log("submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  channel: Yup.string().required("Required!"),
  comments: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Comments Required";
  }
  return error;
};

const FormikReg = () => {
  const [formValues, setFormValues] = useState(null);
  return (
    <div className="container mx-auto">
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
        // validateOnChange={false}
        // validateOnMount
      >
        {(formik) => {
          // console.log(formik);
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="email">E-mail</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email">
                  {(errorMsg) => <div className="error">{errorMsg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-control">
                <label htmlFor="channel">Channel</label>
                <Field type="text" id="channel" name="channel" />
                <ErrorMessage name="channel" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="comments">Comments</label>
                <Field
                  as="textarea"
                  type="text"
                  id="comments"
                  name="comments"
                  validate={validateComments}
                />
                <ErrorMessage name="comments" component={TextError} />
              </div>

              <div className="form-control">
                <label htmlFor="address">Address</label>
                <FastField name="address">
                  {(props) => {
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <input id="address" {...field} />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </FastField>
                <ErrorMessage name="address" />
              </div>
              {/* Nested object  */}
              <div className="form-control">
                <label htmlFor="facebook">Facebook profile</label>
                <Field type="text" id="facebook" name="social.facebook" />
              </div>
              <div className="form-control">
                <label htmlFor="twitter">Twitter profile</label>
                <Field type="text" id="twitter" name="social.twitter" />
              </div>
              {/* Nested object end */}
              {/* Nested array start */}
              <div className="form-control">
                <label htmlFor="primaryPh">Primary phone number</label>
                <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
              </div>
              <div className="form-control">
                <label htmlFor="secondaryPh">Secondary phone number</label>
                <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
              </div>
              <div className="form-control">
                <label>List of phone numbers</label>
                <FieldArray name="phNumbers">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { phNumbers } = values;
                    return (
                      <div>
                        {phNumbers.map((phNumber, i) => (
                          <div key={phNumber + i}>
                            <Field name={`phNumbers[${i}]`} />
                            {i > 0 && (
                              <button type="button" onClick={() => remove(i)}>
                                {" "}
                                -{" "}
                              </button>
                            )}
                            <button type="button" onClick={() => push("")}>
                              {" "}
                              +{" "}
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              {/* Nested array end */}

              {/* <button
                type="button"
                onClick={() => formik.validateField("comments")}
                className="border-2 border-black px-4 mr-2"
              >
                Validate field
              </button>
              <button
                type="button"
                onClick={() => formik.validateForm()}
                className="border-2 border-black px-4 mr-2"
              >
                Validate form
              </button>
              <button
                type="button"
                onClick={() => formik.setFieldTouched("comments")}
                className="border-2 border-black px-4 mr-2"
              >
                Validate comments field
              </button>
              <button
                type="button"
                onClick={() =>
                  formik.setTouched({
                    name: true,
                    email: true,
                    channel: true,
                    comments: true,
                  })
                }
                className="border-2 border-black px-4 mr-2"
              >
                Validate form
              </button> */}
              <button
                type="button"
                onClick={() => setFormValues(savedValues)}
                className="border-2 border-black px-4 mr-2"
              >
                Load saved data
              </button>
              <button
                type="reset"
                onClick={() => setFormValues(savedValues)}
                className="border-2 border-black px-4 mr-2"
              >
                Reset
              </button>
              {/* <button type="submit" className="border-2 border-black px-4" disabled={!(formik.isValid)}> */}
              <button
                type="submit"
                className="border-2 border-black px-4"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormikReg;
