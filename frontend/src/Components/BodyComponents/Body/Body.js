import React, { useState, useEffect } from "react";

import Login from "../Login/Login";
import Register from "../Register/Register";
import HomeScreen from "../LoggedInHome/HomeScreen";
import { register, login } from "../../../services/service";

import "./Body.css";

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

  const handleRegsiter = async (username, password, auth) => {
    try {
      let response = await register(username, password, auth);
      console.log("Response from body", response);
      if (response.message == "User already exists") {
        console.log("User already exists");
      } else {
        setLoggedInUser({ user: response.user.user, auth: response.user.auth });
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let response = await login(username, password);
      if (!response.authStatus) {
        console.log("Incorrect username or password");
      } else {
        setLoggedInUser({ user: response.user, auth: response.auth });
        setLoggedIn(response);
      }
    } catch (error) {
      console.log(error);
    }
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
