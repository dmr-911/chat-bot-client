// import React from 'react';
// import { Field, useFormik } from 'formik';
// import { NavLink } from 'react-router-dom';
// import * as Yup from 'yup';

// const SignUp = () => {
//         // formik
//         const initialValues = {
//             email : '', 
//             phone: '',
//             password : '',
//             first_name : '',
//             last_name:'',
//             sex : ['Female', 'Male', 'Others']
//         };

//         const validationSchema = Yup.object({
//             firstName: Yup.string()
//               .max(15, 'Must be 15 characters or less')
//               .required('Required'),
//             lastName: Yup.string()
//               .max(20, 'Must be 20 characters or less')
//               .required('Required'),
//             email: Yup.string().email('Invalid email address').required('Required'),
//             password : Yup.string().required(),
//             gender : Yup.string().required('Gender required!')
//           });
    
//         const onSubmit = async values =>{
//         };
    
        
//         const formik = useFormik({
//             initialValues,
//             onSubmit,
//             validationSchema
//           });
//   return (
//     <section className="bg-body md:py-16 h-full relative">
//     {/* main chat section */}
//     <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
//       {/* component */}
//       <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[660px] overflow-hidden">
//       <div className="relative flex flex-col justify-center h-full overflow-hidden">
//             <div className="w-full p-6 m-auto bg-white rounded-md">
//                 <h1 className="text-3xl font-semibold text-center text-[#3E8A5F] underline">
//                    Sign Up
//                 </h1>
//                 <form className="mt-6" onSubmit={formik.handleSubmit}>
//                     <div className="mb-2">
//                         <label
//                             htmlFor="email"
//                             className="block text-sm font-semibold text-gray-800"
//                         >
//                             Email
//                         </label>
//                         <input
//                             id='email'
//                             name='email'
//                             type="email"
//                             onChange={formik.handleChange}
//                             value={formik.values.email}
//                             className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         />
//                     </div>
//                     <div className="mb-2">
//                         <label
//                             htmlFor="password"
//                             className="block text-sm font-semibold text-gray-800"
//                         >
//                             Password
//                         </label>
//                         <input
//                             id='password'
//                             name='password'
//                             onChange={formik.handleChange}
//                             value={formik.values.password}
//                             type="password"
//                             className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                         />
//                     </div>

//                     <p>Please select your gender:</p>
//                     <div className='flex gap-4 justify-center'>
//                         <label htmlFor="gender1">
//                         <input type="radio" id="gender1" name="gender" value={formik.values?.gender[0]}/>
//                         <span className='ml-2'>Female</span></label>
//                         <label htmlFor="gender2"><input type="radio" id="gender2" name="gender" value={formik.values?.gender[1]}/>
//                         <span className='ml-2'>Male</span></label>
//                         <label htmlFor="gender3"><input type="radio" id="gender3" name="gender" value={formik.values?.gender[2]}/>
//                         <span className='ml-2'>Other</span></label>
//                     </div>
 
//                     <div className="mt-6">
//                         <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none focus:bg-green-600">
//                             Sign up
//                         </button>
//                     </div>
//                     <p>Already have an account? <NavLink to="/login" style={{textDecoration : 'underline', color : '#3E8A5F'}}>Sign In</NavLink></p>
//                 </form>
//             </div>
//         </div>
        
//         </div>
//         </div>
//         </section>
//   )
// }

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../formik/formikControl";


const SignUp = () => {
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
        first_name : Yup.string().required("First name required!"),
        last_name : Yup.string().required("Last name required!"),
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
      };
  return (
    <section className="bg-body md:py-16 h-full relative">
    {/* main chat section */}
    <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
      {/* component */}
      <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[660px] overflow-hidden">
      <div className="relative flex flex-col justify-center h-full overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md">
                <h1 className="text-3xl font-semibold text-center text-[#3E8A5F] underline">
                   Sign Up
                </h1>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        {
            formik =>{
                return <Form>
                    <FormikControl
                    control = 'input'
                    type="text"
                    label="First Name"
                    name="first_name"
                    />
                    <FormikControl
                    control = 'input'
                    type="text"
                    label="Last Name"
                    name="last_name"
                    />
                    <FormikControl
                    control = 'input'
                    type="email"
                    label="Email"
                    name="email"
                    />
                    <FormikControl
                    control = 'input'
                    type="password"
                    label="Password"
                    name="password"
                    />
                    <FormikControl
                    control = 'input'
                    type="text"
                    label="Phone number"
                    name="phone_number"
                    />
                    <FormikControl
                    control = 'radio'
                    label="Gender"
                    name="sex"
                    
                    options={options}
                    />
                                         <div className="mt-6">
                         <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none focus:bg-green-600">
                             Sign up
                         </button>
                     </div>
                    {/* <button type="submit" disabled={!formik.isValid}>Submit</button> */}
                </Form>
            }
        }
    </Formik>
    </div>
    </div>
    </div>
    </div>
    </section>
  );
};

export default SignUp