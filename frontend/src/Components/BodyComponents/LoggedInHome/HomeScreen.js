import React, { useState } from "react";

import {
  getAllUsers,
  deleteUser,
  getAllNotes,
  addNote,
} from "../../../services/service";
import { BsPenFill, BsFillTrashFill } from "react-icons/bs";
import UserBar from "./UserBar";
import NoteBar from "./NoteBar";

import "./LoggedInStyles.css";

export default function HomeScreen({ user, handleLogout }) {
  const [users, setUsers] = useState([]);
  const [viewAdminOps, setViewAdminOps] = useState(false);
  const [viewNoteOps, setViewNoteOps] = useState(false);
  const [userNotes, setUserNotes] = useState([]);

  async function handleGetUsers() {
    setViewNoteOps(false);
    setViewAdminOps(true);
    const userList = await getAllUsers();
    console.log(userList);
    setUsers(userList);
  }

  async function handleGetNotes() {
    setViewAdminOps(false);
    setViewNoteOps(true);

    // retrieve and store all of the users notes
    const notes = await getAllNotes(user.id);
    setUserNotes(notes);
  }

  async function handleCreateNewNote(date, content) {
    console.log(`Creating new note with: {
      user: ${user.id},
      date: ${date}
      content: ${content}
    }`);
    const response = addNote(user.id, date, content);
  }

  const removeUser = (id) => {
    console.log(`removing user id with: ${id}`);
    deleteUser(id);
  };

  // date and formatted date for Notebar
  const date = new Date();
  const EST = date.toLocaleString("en-US", { timeZone: "America/New_York" });
  const formatted_Date = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

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
          <NoteBar date={EST} content={""} />

          {/* Mapped Notes */}
          {userNotes.map(({ id, date, content }, index) => (
            <NoteBar key={index} id={id} date={date} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
