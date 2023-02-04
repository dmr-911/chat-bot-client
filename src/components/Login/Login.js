import React from 'react';
import { useFormik } from 'formik';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
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

      console.log(location)
      if(user?.username) {
        return <Navigate to={destination}/>
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
                            id='email'
                            name='email'
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
                            id='password'
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#3E8A5F] focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
 
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none focus:bg-green-600">
                            Login
                        </button>
                    </div>
                    <p>Don't have account? <NavLink to="/signup" style={{textDecoration : 'underline', color : '#3E8A5F'}}>Signup</NavLink></p>
                </form>
            </div>
        </div>
        
        </div>
        </div>
        </section>
  )
}

export default Login