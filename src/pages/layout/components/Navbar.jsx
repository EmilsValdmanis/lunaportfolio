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
    <div className="flex p-10 w-full bg-gray-500 justify-between">
      <p>Luna's Portfolio</p>
      <div className="flex gap-4">
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
