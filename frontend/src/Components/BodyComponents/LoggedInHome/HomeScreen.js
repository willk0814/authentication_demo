import React, { useState } from "react";

import {
  getAllUsers,
  deleteUser,
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} from "../../../services/service";
import { BsPenFill, BsFillTrashFill } from "react-icons/bs";
import UserBar from "./UserBar";
import NoteBar from "./NoteBar";
import NewNoteBar from "./NewNoteBar";

import "./LoggedInStyles.css";

export default function HomeScreen({ user, handleLogout }) {
  const [users, setUsers] = useState([]);
  const [viewAdminOps, setViewAdminOps] = useState(false);
  const [viewNoteOps, setViewNoteOps] = useState(false);
  const [userNotes, setUserNotes] = useState([]);

  // Admin operation functions - view all users
  async function handleGetUsers() {
    setViewNoteOps(false);
    setViewAdminOps(true);
    const userList = await getAllUsers();

    setUsers(userList);
  }

  // Admin operation functions - remove user
  async function removeUser(id) {
    const response = await deleteUser(id);
  }

  // Note taking operations
  async function handleGetNotes() {
    setViewAdminOps(false);
    setViewNoteOps(true);

    // retrieve and store all of the users notes
    const notes = await getAllNotes(user.id);
    setUserNotes(notes);
  }

  // Create new note
  async function handleCreateNewNote(date, content) {
    const response = await addNote(user.id, date, content);
    setUserNotes((prevUserNotes) => [...prevUserNotes, response]);
  }

  // Delete note
  async function handleDeleteNote(noteID) {
    console.log(`Deleting note from user: ${user.id} with id: ${noteID}`);
    const response = await deleteNote(user.id, noteID);

    // update rendered notes
    setUserNotes((prevUserNotes) =>
      prevUserNotes.filter((note) => note._id !== response._id)
    );
  }

  async function handleUpdateNote(noteID, content, date) {
    const response = await updateNote(noteID, content);

    // update rendnered notes
  }

  // formatted date for notebar
  const current_date = new Date().toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <p style={{ display: "inline" }}>
          Congratulations you are logged in {user.user}
        </p>
        <button className="bodyButton_selected" onClick={handleLogout}>
          Log Out
        </button>
        <button className="bodyButton_selected" onClick={handleGetNotes}>
          Notes
        </button>

        <div className="adminHeader">
          {user.auth ? (
            <p style={{ display: "inline" }}>
              You have access to admin operations
            </p>
          ) : (
            <p style={{ display: "inline", color: "gray" }}>
              You do not have access to admin operations
            </p>
          )}
          <button
            className={
              user.auth ? "bodyButton_selected" : "bodyButton_selected_inactive"
            }
            style={{ marginTop: "5px", display: "inline" }}
            onClick={handleGetUsers}
            disabled={!user.auth}
          >
            View all users
          </button>
        </div>
      </div>
      {viewAdminOps && (
        <div className="adminContainer">
          <div className="userMapContainer">
            {users.map((user, index) => (
              <UserBar
                key={index}
                user={user.user}
                status={user.auth}
                id={user._id}
                removeUser={removeUser}
              />
            ))}
          </div>
        </div>
      )}

      {viewNoteOps && (
        <div className="notesContainer">
          {/* New Note - this first notebar will allow the creation of a new note*/}
          <NewNoteBar
            date={current_date}
            content={""}
            penHandler={handleCreateNewNote}
          />

          {/* Mapped Notes */}
          {userNotes.map((note, index) => (
            <NoteBar
              key={note._id}
              id={note._id}
              date={new Date(note.date).toLocaleString("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              })}
              content={note.content}
              penHandler={handleUpdateNote}
              trashCanHandler={handleDeleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
