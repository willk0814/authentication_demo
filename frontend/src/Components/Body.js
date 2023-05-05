import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import HomeScreen from "./HomeScreen";

export default function Body() {
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleShowLogin = (value) => {
    setShowLogin(value);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = (authStatus, username, password) => {
    setLoggedIn(authStatus);
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
