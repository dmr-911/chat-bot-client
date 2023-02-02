import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from '../textError/textError';

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option, i) => {
            return (
              <React.Fragment key={i}>
                <input
                  type="radio"
                  id={option.value}
                  className="ml-3"
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>
  );
};

export default RadioButtons;
