import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const location = useLocation();
    const destination = location?.state?.from || '/';

    // useCredentials
    const {user , login} = useAuth();

    // formik 
    const initialValues = {
        email : '', 
        password : ''
    }

    const onSubmit = async values =>{
        login(values.email, values.password);
    };

    
    const formik = useFormik({
        initialValues,
        onSubmit,
      });

      if(user?.username) {
        return <Navigate to={destination}/>
      }

  return (
    <section className="bg-body md:py-16 h-full relative">
    {/* main chat section */}
    <div className="xl:w-[560px] bg-white mx-auto rounded-xl">
      {/* component */}
      <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[660px] overflow-hidden">
      <div className="relative flex flex-col justify-center h-full overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Sign in
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
                            id='email'
                            name='email'
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            id='password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
 
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        </div>
        </div>
        </section>
  )
}

export default Login