import {useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {deleteNote, getNotes } from '../APIS/notes'
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Loading from './Loading';
import empty from '../assets/empty.jpg'
import { Button, Modal } from "flowbite-react";
import { Formik, useFormik } from 'formik';
import axios from 'axios';

export default function Home() {
  let { data, status, isLoading } = useQuery({ queryKey: ['note'], queryFn: getNotes });
  let [notes, setNotes] = useState([]);
  let [selectedNoteId, setSelectedNoteId] = useState(null);
  let [searchedArray, setSearchedArray] = useState([]);
  const [openModal, setOpenModal] = useState(false);

   async function handleUpdate(values) {
    try {
      const { data } = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${selectedNoteId}`, values, {
        headers: { Token: '3b8ny__' + localStorage.getItem('Token') }
      });
      toast.success('Note is updated');

      // Re-fetch notes from the backend after the update
      const updatedNotes = await getNotes();
      setNotes(updatedNotes.data.notes);
      setSearchedArray(updatedNotes.data.notes);

    } catch (error) {
      console.error(error);
      toast.error('Failed to update the note');
    }
  }

  let formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: handleUpdate
  });

  const handleEditClick = ({ title, content, _id }) => {
    setSelectedNoteId(_id)
    formik.setValues({ title, content });
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setSearchedArray(notes.filter(note => note?._id !== id)); // Update state after deletion
      setNotes(notes.filter(note => note?._id !== id)); // Update state after deletion
      toast.info("Note Deleted Successfully", {
        autoClose: 2000
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  }

  useEffect(() => {
    if (status === 'success') {
      setNotes(data?.data?.notes);
      setSearchedArray(data?.data?.notes);
    }
  }, [data,status]);

  function search(e) {
    const value = e.target.value.toLowerCase();
    if (value === '') {
      setSearchedArray(notes);
    } else {
      setSearchedArray(notes.filter((note) => note?.title.toLowerCase().includes(value)));
    }
  }

  if (isLoading) return <Loading></Loading>;


  return (
    <>
      {/* Modal for updating notes */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Update Your Note</Modal.Header>
        <Modal.Body>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
          </div>
          <div className="mb-5">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.content} type="text" id="content" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { formik.handleSubmit(); setOpenModal(false); }}>Update</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>Decline</Button>
        </Modal.Footer>
      </Modal>

      {/* Notes list and search */}
      <div className='container my-7'>
        <ToastContainer />
        <input onChange={search} type="text" id="simple-search" className="my-4 bg-[#f0efef] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Title" />
        <Link to={'/addNote'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ms-auto block w-fit dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">add Note</Link>
        <div className='flex justify-center gap-6 my-10 flex-wrap'>
          {notes.length > 0 ? searchedArray.map((note) => (
            <div key={note?._id} className='flex flex-col justify-between bg-[#EEEEEE] w-1/4 p-3 rounded-md text-[#1E2A5E]'>
              <h1 className='text-3xl font-bold'>{note?.title}</h1>
              <p className='my-3'>{note.content}.</p>
              <div className='flex justify-between items-center'>
                <h5 className='text-sm text-gray-500'>{moment(note?.createdAt).format('ll')}</h5>
                <div className='flex gap-4 items-center'>
                  <i className="fa-solid fa-trash fa-lg cursor-pointer" style={{ color: '#b51c1c' }} onClick={() => { handleDelete(note?._id) }} />
                  <i onClick={() => handleEditClick(note)} className="fa-regular fa-pen-to-square fa-lg cursor-pointer" style={{ color: '#2855a4' }} />
                </div>
              </div>
            </div>
          )) :
            <div className='my-20'>
              <p className='text-center text-blue-700 text-2xl'>NO NOTES ADDED YET</p>
              <div className='flex justify-center items-center'>
                <img className='w-full' src={empty}></img>
              </div>
            </div>}
        </div>
      </div>
    </>
  );
}

