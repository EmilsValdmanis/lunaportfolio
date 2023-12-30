import React from "react"
import { Link } from "react-router-dom"

const Footer = ({ user }) => {
  return (
    <div className="flex p-10 w-full bg-gray-100 font-calligraphy text-3xl justify-between">
      {!user && (
        <Link
          to={'/admin/login'}
          className="border-b-2 border-transparent hover:border-orange-500"
        >
          Login to upload an image
        </Link>
      )}
      <p><span className="text-xl">©</span> Luna. All rights reserved</p>
    </div>
  )
}

export default Footer
