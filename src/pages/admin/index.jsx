import React from "react"
import { Link } from "react-router-dom"

const AdminPanel = () => {
  return (
    <div>
      <p>Welcome to the admin panel!</p>
      <Link to={'/admin/login'}>Login</Link>
    </div>
  )
}

export default AdminPanel
