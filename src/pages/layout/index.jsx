import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Suspense } from "react"

const Layout = () => {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Navbar/>
      <main className="grow p-10">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet/>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
