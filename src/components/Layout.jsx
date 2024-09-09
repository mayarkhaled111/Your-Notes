import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'

export default function () {
  return (
    <div>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </div>
  )
}
