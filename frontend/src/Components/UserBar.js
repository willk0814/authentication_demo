import React, { useState, useEffect } from "react";

export default function UserBar({ user, status, id, removeUser }) {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    // setShowConfirmBtn(event.target.value !== status);
  };

  useEffect(() => {
    setShowConfirmBtn(selectedStatus !== status);
  }, [selectedStatus, status]);

  return (
    <div className="userContentContainer">
      <p className="userText">{user}</p>
      {/* <p className="userText">{status ? "true" : "false"}</p> */}
      <select value={selectedStatus} onChange={handleStatusChange}>
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
      {showConfirmBtn && <button>Confirm changes</button>}
      <button onClick={() => removeUser(id)}>Remove user</button>
    </div>
  );
}
