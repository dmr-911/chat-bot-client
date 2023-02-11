import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../textError/textError";

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name} className="text-[#142330]">
        {label}
      </label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option, i) => {
            return (
              <React.Fragment key={option + i}>
                <input
                  type="radio"
                  id={option.value}
                  className="ml-3 text-[#142330]"
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
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButtons;
