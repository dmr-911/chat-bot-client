import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from '../textError/textError';

const Input = (props) => {
    const {label, name, ...rest} = props;
  return (
    <div className='form-control'>
        <label  htmlFor={name}>{label}</label>
        <Field id={name} name={name} {...rest} className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        <ErrorMessage name={name} component={TextError}/>
    </div>
  )
}

export default Input