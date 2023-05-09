import React, { useState, useEffect } from "react";
import PassProgressBar from "./PassProgressBar";

export default function Register({ handleRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passStrength, setPassStrength] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegisterClick = () => {
    let valid_acc = true;
    if (password !== confirmPassword) valid_acc = false;
    if (passStrength < 8) valid_acc = false;
    if (username.length < 3) valid_acc = false;

    if (valid_acc) handleRegister(username, password, false);
    else console.log("not all reqs were met");
  };

  useEffect(() => {
    if (password === "") {
      setPassStrength(0);
    } else {
      const specialCharacters = ["!", "?", "*"];
      let length = 0;
      let specialChars = 0;
      let numbers = 0;
      for (const [letter] of password) {
        if (specialCharacters.includes(letter)) {
          if (specialChars === 0) {
            specialChars += 1;
          }
        } else if (!isNaN(letter)) {
          if (numbers === 0) {
            numbers += 1;
          }
        } else {
          if (length < 6) {
            length += 1;
          }
        }
        let strength = length + specialChars + numbers;
        setPassStrength(strength);
      }
    }
  }, [password]);
  return (
    <div className="registerRowContainer">
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
            type="password"
            onChange={handlePasswordChange}
          />
        </div>

        <div className="inputContainer">
          <label className="label">Re Enter Password</label>
          <input
            className="input"
            type="password"
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <button className="submitButton" onClick={handleRegisterClick}>
          Register
        </button>
      </div>

      <div className="divider"></div>

      <div className="passStrengthContainer">
        <p className="passTitle">Password Strength Reqs:</p>
        <ul className="passRequirementsList">
          <li className="passRequirementListItem">Min. 6 characters</li>
          <li className="passRequirementListItem">One special character</li>
          <li className="passRequirementListItem">One number</li>
        </ul>
        <PassProgressBar progress={passStrength} />
      </div>
    </div>
  );
}
