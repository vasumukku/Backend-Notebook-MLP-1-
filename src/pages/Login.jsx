import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password
        }
      );

      alert(response.data.message);

      // store token
      localStorage.setItem(
        "token",
        response.data.token
      );

      console.log(localStorage.getItem("token"));

      navigate("/Notebook");

    } catch (error) {

      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div>

      <h1>Login Account</h1>

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <p>
        Dont have account{" "}

        <Link to="/signin">
          Create Account
        </Link>

      </p>

    </div>
  );
};

export default Login;