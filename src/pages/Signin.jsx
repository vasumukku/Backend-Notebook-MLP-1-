import React, { useState } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

const Signin = () => {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const create = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/signin",
        {
          name,
          email,
          password
        }
      );

      console.log(response.data.userdata.name);

      alert(
        `${response.data.userdata.name} account created successfully`
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={styles.container}>

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
          Signin
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
  )
}

export default Signin

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",
    backgroundPosition: "center",
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

    border: "1px solid rgba(255,255,255,0.2)",
  },

  heading: {
    textAlign: "center",
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    outline: "none",

    background: "rgba(255,255,255,0.2)",

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