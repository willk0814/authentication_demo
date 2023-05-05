import React, { useState } from "react";
import { login } from "../services/service";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = () => {
    let authStatus = login(username, password);
    if (!authStatus) {
      console.log("Incorrect username or pass");
      return;
    }
    handleLogin(authStatus, username, password);
  };

  return (
    <div>
      <div className="formAlignment">
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
        <button className="submitButton" onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </div>
  );
}
