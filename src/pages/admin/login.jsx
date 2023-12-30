import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../utils/firebase.utils"
import { useAuthState } from "react-firebase-hooks/auth"

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notice, setNotice] = useState('')
  const [user] = useAuthState(auth)

  const login = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/admin")
    } catch {
      setNotice("You entered a wrong username or password.")
    }
  }

  if(user){
    navigate('/admin')
  }

  return (
    <form className="p-10 bg-orange-500 rounded-3xl flex flex-col gap-4 m-auto">
      {notice && <p>{notice}</p>}
      <input
        type="email"
        name="email"
        autoComplete="username"
        placeholder="Username"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={login} className="bg-white">Submit</button>
    </form>
  )
}

export default AdminLogin
