import React from 'react'
import { useNavigate,Link} from 'react-router'

const Signin = () => {
  const navigate=useNavigate();
  const gotologin=async () => {
    navigate("/login")
  }
  return (
    <div>
      <h1>Login Account</h1>
      {/* <input type="text" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/> */}
      {/* <h2>{name}</h2> */}
      <input type="email" placeholder='Enter your name' onChange={(e)=>setEmail(e.target.value)}/>
      <br /> <br />
      <input type="password" placeholder='Enter your name' onChange={(e)=>setPassword(e.target.value)}/>

      <br /> <br />
      <button >signin</button>
      <p>
  Dont have account{" "}
    <Link to="/">
          Login account
        </Link>
</p>


    </div>
  )
}

export default Signin
