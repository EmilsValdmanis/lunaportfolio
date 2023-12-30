import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import NoPage from "./pages/noPage"
import Layout from "./pages/layout"
import Home from "./pages/home"
import About from "./pages/about"
import AdminLogin from "./pages/admin"

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement: <NoPage/>,
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path: '/about',
          element: <About/>
        },
        {
          path: '/admin/login',
          element: <AdminLogin/>
        }
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
