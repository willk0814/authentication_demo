import React from "react";
import { updateUserAuth } from "../../../services/service";

export default function UserBar({ user, status, id, removeUser }) {
  return (
    <div className="userContentContainer">
      <p className="userText">{user}</p>
      {/* <p className="userText">{status ? "true" : "false"}</p> */}
      {!status ? (
        <button onClick={() => updateUserAuth(id, true)}>
          Upgrade user to admin
        </button>
      ) : (
        <button onClick={() => updateUserAuth(id, false)}>
          remove user from admin
        </button>
      )}
      <button onClick={() => removeUser(id)}>Remove user</button>
    </div>
  );
}
