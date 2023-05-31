import React, { useState } from "react";

import { getAllUsers, deleteUser } from "../../../services/service";
import UserBar from "./UserBar";

import "./LoggedInStyles.css";

export default function HomeScreen({ user, handleLogout }) {
  const [users, setUsers] = useState([]);

  async function handleGetUsers() {
    const userList = await getAllUsers();
    console.log(userList);
    setUsers(userList);
  }

  const removeUser = (id) => {
    console.log(`removing user id with: ${id}`);
    deleteUser(id);
  };

  return (
    <div className="homeContainer">
      <div className="homeContentContainer">
        <p>Congratulations you are logged in {user.user}</p>
        <button className="bodyButton_selected" onClick={handleLogout}>
          Log Out
        </button>

        <button
          className="bodyButton_selected"
          style={{ marginTop: "5px" }}
          onClick={handleGetUsers}
        >
          View all users
        </button>

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
    </div>
  );
}
