import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { login } from '../../Features/userSlice';
// import { login } from'../Features/userSlice';

const Admin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(
      login({
        email: email,
        password: password,
        loggedIn: true,
      })
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>LogIn Form </h1>
        <input type='email' name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' name='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Admin;

