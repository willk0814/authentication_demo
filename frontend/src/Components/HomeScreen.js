import React from "react";

export default function HomeScreen({ user, handleLogout }) {
  return (
    <div className="homeContainer">
      <p>Congratulations you are logged in {user.user}</p>
      <button className="bodyButton_selected" onClick={handleLogout}>
        Log Out
      </button>

      <button
        className="bodyButton_selected"
        style={{ marginTop: "5px" }}
        onClick={console.log("pressed")}
      >
        View all users
      </button>
    </div>
  );
}
