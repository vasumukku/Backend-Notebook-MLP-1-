import React, { useState } from 'react';

import axios from 'axios';

import toast from "react-hot-toast";

import {
  Link,
  useNavigate
} from 'react-router-dom';

const Signin = () => {

  const BASE_URL =
    import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const create = async () => {

    try {

      const response = await axios.post(

        `${BASE_URL}/signin`,

        {
          name,
          email,
          password
        }
      );

      console.log(response.data);

      toast.success(
        `${response.data.userdata.name} Account Created`
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error("Signup Failed");

    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.overlay}>

        <div style={styles.card}>

          <h1 style={styles.heading}>
            Create Account
          </h1>

          <input
            type="text"
            placeholder='Enter your name'
            style={styles.input}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />

          <input
            type="email"
            placeholder='Enter your email'
            style={styles.input}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <input
            type='password'
            placeholder='Enter your password'
            style={styles.input}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <button
            style={styles.button}
            onClick={create}
          >
            Sign Up
          </button>

          <p style={styles.text}>

            Already have an account ?

            <Link
              to="/"
              style={styles.link}
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Signin

const styles = {

  container: {

    height: "100vh",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",
  },

  overlay: {

    height: "100%",

    width: "100%",

    background: "rgba(0,0,0,0.55)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",
  },

  card: {

    width: "360px",

    background: "rgba(255,255,255,0.12)",

    backdropFilter: "blur(12px)",

    padding: "35px",

    borderRadius: "20px",

    boxShadow:
      "0px 8px 32px rgba(0,0,0,0.3)",

    display: "flex",

    flexDirection: "column",

    gap: "18px",

    border:
      "1px solid rgba(255,255,255,0.2)",
  },

  heading: {

    textAlign: "center",

    color: "white",

    fontSize: "34px",

    fontWeight: "bold",
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    fontSize: "16px",

    outline: "none",

    background:
      "rgba(255,255,255,0.2)",

    color: "white",
  },

  button: {

    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background:
      "linear-gradient(to right,#141e30,#243b55)",

    color: "white",

    fontSize: "16px",

    cursor: "pointer",

    fontWeight: "bold",
  },

  text: {

    textAlign: "center",

    color: "white",
  },

  link: {

    marginLeft: "5px",

    color: "#fff",

    textDecoration: "none",

    fontWeight: "bold",
  },
};