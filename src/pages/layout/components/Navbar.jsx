import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../../utils/firebase.utils"
import { signOut } from "firebase/auth"

const Navbar = ({ user }) => {
  const navigate = useNavigate()

  const logoutUser = async (e) => {
    e.preventDefault()
    await signOut(auth)
    navigate("/")
  }

  return (
    <div className="flex flex-col md:flex-row px-16 py-8 w-full bg-gray-100 justify-between items-center font-calligraphy">
      <Link
        to={`/`}
        className="text-7xl border-b-2 border-transparent hover:border-orange-500"
      >
        Luna
      </Link>
      <div className="flex gap-8 text-4xl">
        <Link
          to={`/`}
          className="border-b-2 border-transparent hover:border-orange-500"
        >
          Home
        </Link>
        <Link
          to={`/about`}
          className="border-b-2 border-transparent hover:border-orange-500"
        >
          About
        </Link>
        {user && (
          <button onClick={logoutUser}>Log out</button>
        )}
      </div>
    </div>
  )
}

export default Navbar
