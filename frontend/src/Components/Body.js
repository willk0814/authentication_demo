import React, { useState, useEffect } from "react";

import Login from "./Login";
import Register from "./Register";
import HomeScreen from "./HomeScreen";
import { register, login } from "../services/service";

export default function Body() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({ user: "", auth: false });

  const toggleShowLogin = (value) => {
    setShowLogin(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("key");
    setLoggedIn(false);
  };

  const handleRegsiter = (username, password, auth) => {
    register(username, password, auth);
    setLoggedInUser({ user: username, auth: auth });
    setLoggedIn(true);
  };

  const handleLogin = (authStatus, username, auth) => {
    setLoggedInUser({ user: username, auth: auth });
    setLoggedIn(authStatus);
  };

  // useEffect(() => {
  //   const key = localStorage.getItem("key");
  //   console.log(key);
  //   if (!key) {
  //     setLoggedIn(false);
  //     setLoggedInUser({ user: "", auth: false });
  //   } else {
  //     setLoggedIn(true);
  //   }
  // }, []);

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
          {showLogin ? (
            <Login handleLogin={handleLogin} />
          ) : (
            <Register handleRegister={handleRegsiter} />
          )}
        </div>
      ) : (
        <HomeScreen user={loggedInUser} handleLogout={handleLogout} />
      )}
    </div>
  );
}
