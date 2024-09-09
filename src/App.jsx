import './App.css'
import AddNote from './components/AddNote'
import Home from './components/Home'
import Layout from './components/Layout'
import Login from './components/Login'
import { Register } from './components/Register'
import { createHashRouter, RouterProvider } from 'react-router-dom'

function App() {

  let routes = createHashRouter ([{
    path:'/',element:<Layout></Layout>,children:[
      {index: true, element: <Home></Home>},
      {path: '/login', element: <Login></Login>},
      {path: '/register', element: <Register></Register>},
      {path: '/addNote', element: <AddNote></AddNote>},
    ]
  }])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
