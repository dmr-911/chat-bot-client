import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from "yup";
import useAuth from '../hooks/useAuth';
import FormikControl from './formik/formikControl'
import ProfileLayout from './ProfileLayout'

const EditProfile = () => {
    const {user} = useAuth();

    // formik
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      };
    
      const validationSchema = Yup.object({
        first_name : Yup.string().required("First name required!"),
        last_name : Yup.string().required("Last name required!"),
        email: Yup.string().email("Invalid email").required("Email required!"),
        phone_number: Yup.string(),
      });

      const onSubmit = values =>{
        console.log(values)
      }


      // effect for user details 
      useEffect(()=>{
        if(user?.username){
            initialValues.email = user.username;
            initialValues.phone_number = user?.phone_number;
            initialValues.first_name = user?.first_name;
            initialValues.last_name = user?.last_name;
        }
      },[user])

  return (
    <ProfileLayout>
        <section className="flex flex-col text-left px-4 md:px-32 my-24">
            <h1 className='text-center text-3xl'>Edit Profile</h1>
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
                    disabled
                    />
                    <FormikControl
                    control = 'input'
                    type="text"
                    label="Phone number"
                    name="phone_number"
                    />

                    <div className="mt-6">
                         <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#3E8A5F]/90 rounded-md hover:bg-[#3E8A5F] focus:outline-none">
                             Save
                         </button>
                     </div>
                    {/* <button type="submit" disabled={!formik.isValid}>Submit</button> */}
                </Form>
            }
        }
    </Formik>
        </section>
    </ProfileLayout>
  )
}

export default EditProfile