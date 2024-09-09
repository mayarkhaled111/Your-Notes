import React, { useContext, useState } from 'react'
import logo from '../assets/notes.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function Navbar() {
    let navigate = useNavigate()
    let {isLogin,setIsLogin} = useContext(AuthContext)
console.log(isLogin);

    function logout(){
        localStorage.removeItem('Token')
        setIsLogin(null)
        navigate('/login')
    }
    return (
        <div className="">
            <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md py-2 container">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
                    <p className='flex'><img src={logo} alt="" style={{width:'30px'}}/><span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Your Notes</span></p>
                    <div className='flex'>
                    {isLogin?<button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log out</button>:''}
                    </div>
                </div>
            </nav>
        </div>

    )
}
