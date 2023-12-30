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
    <div className="flex px-16 py-8 w-full bg-gray-100 justify-between items-center font-calligraphy">
      <Link to={`/`} className="text-5xl">Luna's Portfolio</Link>
      <div className="flex gap-8 text-4xl">
        <Link to={`/`}>Home</Link>
        <Link to={`/about`}>About</Link>
        {user && (
          <button onClick={logoutUser}>Log out</button>
        )}
      </div>
    </div>
  )
}

export default Navbar
