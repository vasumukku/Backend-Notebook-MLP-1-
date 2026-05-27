import React, { useEffect, useState } from "react";
import axios from "axios";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Notebook = () => {
  const [notes,setNotes]=useState([]);

  const token = localStorage.getItem("token");

  const getdata = async () => {
    try {

      const response = await axios.get(
        `${VITE_BASE_URL}/allNotes`,{
          headers:{
            Authorization:token
          }
        }
      );

      setNotes(response.data.allnotebooks);
      console.log(response.data);
      console.log(response.data.allnotebooks[0]);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <h1>Notebook is working..</h1>
      {
  notes.map((note) => (
    <div key={note._id}>
      <h2>{note.heading}</h2>
      <p>{note.content}</p>
      <button>update</button>
      <button>delete</button> 
    </div>
  ))
}
    </div>
  );
};

export default Notebook;