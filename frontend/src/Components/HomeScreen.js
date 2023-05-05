import React from "react";

export default function HomeScreen({ handleLogout }) {
  return (
    <div className="homeContainer">
      <p>Congratulations you are logged in</p>
      <button className="bodyButton_selected" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
