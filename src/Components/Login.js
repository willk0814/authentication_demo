import React, { useState } from "react";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form className="formAlignment">
        <div className="inputContainer">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            onChange={handleUsernameChange}
          />
        </div>

        <div className="inputContainer">
          <label className="label">Password</label>
          <input
            className="input"
            type="text"
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="submitButton"
          onClick={() => handleLogin(username, password)}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
