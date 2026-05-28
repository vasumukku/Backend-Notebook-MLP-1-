import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyD_VPblAqXYAheInuhuP3tQMTWOMy8CfrQ",

  authDomain: "notebook-23e8d.firebaseapp.com",

  projectId: "notebook-23e8d",

  storageBucket: "notebook-23e8d.firebasestorage.app",

  messagingSenderId: "176199910450",

  appId: "1:176199910450:web:7d4ee21c020cb78016282b",

  measurementId: "G-HXDH2D4CC8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();