import React, { useState } from 'react';

import axios from 'axios';

import toast from "react-hot-toast";

import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../firebase";

const Login = () => {

  const BASE_URL =
    import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  // NORMAL LOGIN
  const login = async () => {

    try {

      const response = await axios.post(

        `${BASE_URL}/login`,

        {
          email,
          password
        }
      );

      console.log(response.data);

      // STORE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success(
        response.data.message
      );

      navigate("/notes");

    } catch (error) {

      console.log(error);

      toast.error("Login Failed");

    }
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {

    try {

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      console.log(result.user);

      toast.success(
        "Google Login Success"
      );

      navigate("/notes");

    } catch (error) {

      console.log(error);

      toast.error("Google Login Failed");

    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.overlay}>

        <div style={styles.card}>

          <h1 style={styles.heading}>
            Login Account
          </h1>

          <input
            type="email"
            placeholder='Enter your email'
            style={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder='Enter your password'
            style={styles.input}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            style={styles.loginButton}
            onClick={login}
          >
            Login
          </button>

          <div style={styles.or}>
            OR
          </div>

          <button
            style={styles.googleButton}
            onClick={googleLogin}
          >
            Continue with Google
          </button>

          <p style={styles.text}>

            Don't have an account ?

            <Link
              to="/signin"
              style={styles.link}
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;

const styles = {

  container: {
    height: "100vh",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",
  },

  overlay: {
    height: "100%",
    width: "100%",

    background: "rgba(0,0,0,0.5)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",
  },

  card: {

    width: "370px",

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

  loginButton: {

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

  googleButton: {

    padding: "14px",

    border: "none",

    borderRadius: "10px",

    background:
      "linear-gradient(to right,#ff512f,#dd2476)",

    color: "white",

    fontSize: "16px",

    cursor: "pointer",

    fontWeight: "bold",
  },

  or: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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