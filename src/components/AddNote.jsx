import React from 'react'
import { useFormik } from "formik";
import {  useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { addNote} from '../APIS/notes';
import Loading from './Loading';

export default function AddNote() {
    let navigate = useNavigate()
    let { mutate } = useMutation({
        mutationFn: addNote,
        onSuccess: (data) => {
            <Loading></Loading>
          navigate('/');
        },
        onError: (error) => {
          console.log('Login failed:', error);
        },
      });
    function handleNotes(values) {
        mutate(values);
    }
    let formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        onSubmit: handleNotes
    })
    return (
       <div className="flex justify-center items-center h-[600px]">
         <form className="w-[400px] mx-auto" onSubmit={formik.handleSubmit}>
            <h1 className='text-4xl text-center mb-4'>Add Your Notes</h1>
            <p className='text-sm text-gray-400 text-center mb-10'>Writing it down is the first step toward making it happen.</p>
            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
            <div className="mb-5">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.content} type="text" id="content" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">ADD NOTE</button>
        </form>
       </div>

    );
}
