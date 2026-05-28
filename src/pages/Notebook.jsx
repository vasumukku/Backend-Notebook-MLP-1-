import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
  useNavigate
} from "react-router-dom";

const Notebook = () => {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  const [heading, setHeading] = useState("");

  const [content, setContent] = useState("");

  const [createPopup, setCreatePopup] =
    useState(false);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // GET NOTES
  const getnotes = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/allNotes",

        {
          headers: {
            Authorization: token
          }
        }
      );

      setNotes(response.data.allnotebooks);

    } catch (error) {

      console.log(error);

    }
  };

  // CREATE NOTE
  const createNote = async () => {

    try {

      await axios.post(
        "http://localhost:5000/CreateNotebook",

        {
          heading,
          content
        },

        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Note Created");

      setHeading("");

      setContent("");

      setCreatePopup(false);

      getnotes();

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/delete-note/${id}`,

        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Note Deleted");

      getnotes();

    } catch (error) {

      console.log(error);

    }
  };

  // OPEN UPDATE POPUP
  const openUpdate = (note) => {

    setEditId(note._id);

    setHeading(note.heading);

    setContent(note.content);
  };

  // UPDATE NOTE
  const updateNote = async () => {

    try {

      await axios.put(

        `http://localhost:5000/update/${editId}`,

        {
          heading,
          content
        },

        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Note Updated");

      setEditId(null);

      getnotes();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    if (!token) {

      navigate("/");

    } else {

      getnotes();

    }

  }, []);

  return (

    <div style={styles.container}>

      <div style={styles.overlay}>

        <div style={styles.topBar}>

          <h1 style={styles.mainHeading}>
            My Notes
          </h1>

          <div style={styles.topButtons}>

            <button
              style={styles.createButton}
              onClick={() =>
                setCreatePopup(true)
              }
            >
              + Create Note
            </button>

            <button
              style={styles.logoutButton}
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </div>

        <div style={styles.notesContainer}>

          {notes.map((element) => {

            return (

              <div
                key={element._id}
                style={styles.card}
              >

                <h2 style={styles.heading}>
                  {element.heading}
                </h2>

                <p style={styles.content}>
                  {element.content}
                </p>

                <div style={styles.buttonContainer}>

                  <button
                    style={styles.updateButton}
                    onClick={() =>
                      openUpdate(element)
                    }
                  >
                    Update
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      deleteNote(element._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* CREATE POPUP */}

      {createPopup && (

        <div style={styles.popup}>

          <div style={styles.popupCard}>

            <h2>Create Note</h2>

            <input
              type="text"
              placeholder="Enter heading"
              style={styles.input}
              onChange={(e) => {
                setHeading(e.target.value)
              }}
            />

            <textarea
              placeholder="Enter content"
              style={styles.textarea}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />

            <button
              style={styles.saveButton}
              onClick={createNote}
            >
              Create
            </button>

            <button
              style={styles.closeButton}
              onClick={() =>
                setCreatePopup(false)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* UPDATE POPUP */}

      {editId && (

        <div style={styles.popup}>

          <div style={styles.popupCard}>

            <h2>Edit Note</h2>

            <input
              type="text"
              value={heading}
              placeholder="Enter heading"
              style={styles.input}
              onChange={(e) => {
                setHeading(e.target.value)
              }}
            />

            <textarea
              value={content}
              placeholder="Enter content"
              style={styles.textarea}
              onChange={(e) => {
                setContent(e.target.value)
              }}
            />

            <button
              style={styles.saveButton}
              onClick={updateNote}
            >
              Save Update
            </button>

            <button
              style={styles.closeButton}
              onClick={() =>
                setEditId(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Notebook;

const styles = {

  container: {
    minHeight: "100vh",

    backgroundImage:
      "url('https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1600&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",
  },

  overlay: {
    minHeight: "100vh",
    padding: "40px",
    background: "rgba(0,0,0,0.55)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  topButtons: {
    display: "flex",
    gap: "15px",
  },

  mainHeading: {
    color: "white",
    fontSize: "42px",
  },

  createButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#00b09b,#96c93d)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  logoutButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#ff416c,#ff4b2b)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  notesContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    borderRadius: "20px",
    color: "white",
    boxShadow:
      "0px 8px 32px rgba(0,0,0,0.2)",
  },

  heading: {
    marginBottom: "10px",
  },

  content: {
    lineHeight: "1.6",
  },

  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  updateButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#36d1dc,#5b86e5)",
    color: "white",
    cursor: "pointer",
  },

  deleteButton: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#ff416c,#ff4b2b)",
    color: "white",
    cursor: "pointer",
  },

  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  popupCard: {
    width: "400px",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid gray",
    outline: "none",
  },

  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid gray",
    height: "120px",
    outline: "none",
  },

  saveButton: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#36d1dc",
    color: "white",
    cursor: "pointer",
  },

  closeButton: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "gray",
    color: "white",
    cursor: "pointer",
  },
};