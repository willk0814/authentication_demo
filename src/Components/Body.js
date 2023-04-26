import React, { useState } from "react";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import HomeScreen from "./HomeScreen";
import { register } from "../services/service";

export default function Body() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const toggleShowLogin = (value) => {
    setShowLogin(value);
  };

  const handleLogout = () => {
    // setUsername("");
    // setPassword("");
    setLoggedIn(false);
  };

  const handleLogin = (username, password) => {
    // setUsername(username);
    // setPassword(password);
    console.log(`logging in with user:${username} and pass:${password}`);
    setLoggedIn(true);
  };

  return (
    <div className="bodyContainer">
      <div className="buttonsContainer">
        <button
          className={showLogin ? "bodyButton_selected" : "bodyButton"}
          style={{ display: loggedIn ? "none" : "" }}
          onClick={() => toggleShowLogin(true)}
        >
          Login
        </button>
        <button
          className={showLogin ? "bodyButton" : "bodyButton_selected"}
          style={{ display: loggedIn ? "none" : "" }}
          onClick={() => toggleShowLogin(false)}
        >
          Register
        </button>
      </div>

      {!loggedIn ? (
        <div className="formContainer">
          {showLogin ? <Login handleLogin={handleLogin} /> : <Register />}
        </div>
      ) : (
        <HomeScreen handleLogout={handleLogout} />
      )}
    </div>
  );
}
