import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex p-10 w-full bg-gray-500 justify-between">
      <p>Luna's Portfolio</p>
      <div className="flex gap-4">
        <Link to={`/`}>Home</Link>
        <Link to={`/about`}>About</Link>
      </div>
    </div>
  )
}

export default Navbar
