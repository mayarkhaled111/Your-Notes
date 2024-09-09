import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useContext, useState } from 'react'
import * as Yup from "yup";
import { addUser } from "../APIS/user";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function Register() {
    let navigate = useNavigate()
    let {isLogin,setIsLogin} = useContext(AuthContext)
    let validationSchema = Yup.object({
        name: Yup.string().min(2, 'min length is 2 character').max(10, 'max length is 10 character').required('This field is required'),
        email: Yup.string().matches(/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/).required('This field is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}?/).required('This field is required'),
        age: Yup.number().required('This field is required'),
        phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/).required('This field is required')
    })
    let { mutate } = useMutation({
        mutationFn: addUser,
        onSuccess: (data) => {
          console.log(data);
          navigate('/login');
        },
        onError: (error) => {
          console.log('Login failed:', error);
        },
      });
    
      function handleRegister(values) {
        mutate(values);
      }
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            age: '',
            phone: ''
        },
        validationSchema,
        onSubmit: handleRegister
    })
    return (
        <form className="max-w-sm mx-auto my-10" onSubmit={formik.handleSubmit}>
            <h1 className='text-3xl my-3 text-center'>Create your Account</h1>
            <p className='text-sm text-center text-gray-400 my-6'>Get started with our app, just create an account and enjoy the experience.</p>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            {(formik.errors.name) && (formik.touched.name) ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.name}</span>
                </div>
            </div>:''}
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            {(formik.errors.email) && (formik.touched.email) ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.email}</span>
                </div>
            </div>:''}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            {(formik.errors.password) && (formik.touched.password) ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.password}</span>
                </div>
            </div>:''}
            <div className="mb-5">
                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Age</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} type="text" id="age" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            {(formik.errors.age) && (formik.touched.age) ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-2xl bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.age}</span>
                </div>
            </div>:''}
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="text" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            {(formik.errors.phone) && (formik.touched.phone) ?<div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.phone}</span>
                </div>
            </div>:''}
            <p className='text-sm pb-4'>You Already Have an Account? <Link to={'/login'} className='text-red-600 underline'>Sign in</Link></p>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl w-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
        </form>

    );
}
