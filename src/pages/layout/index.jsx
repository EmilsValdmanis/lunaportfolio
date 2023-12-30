import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Suspense } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../utils/firebase.utils"

const Layout = () => {
  const [user, loading] = useAuthState(auth)

  if(loading) return null

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Navbar
        user={user}
      />
      <main className="grow p-10 flex flex-col">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet/>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout