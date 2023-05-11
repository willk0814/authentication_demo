import React from "react";

export default function UserBar({ user, status, id, removeUser }) {
  return (
    <div className="userContentContainer">
      <p className="userText">{user}</p>
      <p className="userText">{status ? "true" : "false"}</p>
      <button onClick={() => removeUser(id)}>Remove user</button>
    </div>
  );
}
