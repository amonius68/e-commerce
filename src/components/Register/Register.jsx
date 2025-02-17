import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [userMessage, setUserMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Must be at least 3 characters")
      .max(18, "Must be at most 18 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must start with uppercase and be 4-9 characters"),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(002)?01[0125][0-9]{8}$/, "Invalid phone number"),
  });

 let formik =  useFormik({
  initialValues:{
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone: "",
  },validationSchema: mySchema,
  onSubmit: (values) => {
    registerForm(values)
    
  }
 })

 async function registerForm(values){
  setIsLoading(true)
  return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data) =>{
    console.log(data.data.message);
    setUserMessage(data.data.message );
    setIsLoading(false);
    navigate('/login')
  } ).catch((err) =>{
    console.log(err.response.data.message);
    setErrorMessage(err.response.data.message)
    setIsLoading(false) 
  })
  
 }

  return (
    <>
    <div className='w-1/2 mx-auto'>
    <h1 className='text-main text-3xl'>Register Now:</h1>
    {userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"> <p>{userMessage}</p></div> : null}
    {errorMessage? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> <p>{errorMessage}</p></div> : null }
    <form onSubmit={formik.handleSubmit}>
   <div className="my-2">
  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
  <input name="name" type="text" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
</div>
<div className="my-2">
  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
  <input name="email" type="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
</div>
<div className="my-2">
  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
  <input name="password" type="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

</div>
<div className="my-2">
  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RePassword</label>
  <input name="rePassword" type="password" id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
            )}
</div>
<div className="my-2">
  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
  <input name="phone" type="tel" id="phone" onChange={formik.handleChange} value={formik.values.phone}  onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
</div>
<div className='my-4 text-end'>
  {isLoading? <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg '><i className='fa fa-spinner fa-spin'></i></button> : <button type='submit' className='bg-main text-white px-4 py-2 rounded-lg' disabled={!(formik.isValid && formik.dirty )}>Register</button>
   }
  
</div>
    </form>
    </div>
    </>
  )
}
