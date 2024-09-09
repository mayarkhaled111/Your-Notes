import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup";
import { login } from '../APIS/user';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';


export default function Login() {
    let navigate = useNavigate()
    let { isLogin, setIsLogin } = useContext(AuthContext)
    let validationSchema = Yup.object({
        email: Yup.string().matches(/^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/).required('This field is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}?/).required('This field is required'),
    })

    let { mutate } = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log(data);
            localStorage.setItem('Token', (data?.data?.token));
            setIsLogin(jwtDecode(data?.data?.token))
            navigate('/');
        },
        onError: (error) => {
            if (error.message)
                setErr('This Mail Already Exists')
            console.log('Login failed:', error);
        },
    });

    function handleLogin(values) {
        mutate(values);
    }
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin
    })
    return (
        <form className="max-w-sm mx-auto mt-14" onSubmit={formik.handleSubmit}>
            <h1 className='text-4xl my-10 text-center'>Login to your Account</h1>
            
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            {(formik.errors.email) && (formik.touched.email) ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.email}</span>
                </div>
            </div> : ''}
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
            </div>
            {(formik.errors.password) && (formik.touched.password) ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{formik.errors.password}</span>
                </div>
            </div> : ''}
            <p className='text-sm pb-4 '>You Don't Have an Account? <Link to={'/register'} className='text-red-600 underline'>Sign Up</Link></p>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mt-5 mb-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full ">login</button>

            <div className="buttons-container">
                <div className="apple-login-button">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} className="apple-icon" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z" />
                    </svg>
                    <span>Log in with Apple</span>
                </div>
                <div className="google-login-button">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} version="1.1" x="0px" y="0px" className="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                    </svg>
                    <span>Log in with Google</span>
                </div>
            </div>

        </form>

    );
}
