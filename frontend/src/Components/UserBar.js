import React from "react";

export default function UserBar({ user, status }) {
  return (
    <div className="userContentContainer">
      <p className="userText">{user}</p>
      <p className="userText">{status ? "true" : "false"}</p>
      <button>Remove user</button>
    </div>
  );
}
