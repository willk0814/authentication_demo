import React, { useState } from "react";

import { BsPenFill, BSTRas, BsTrash } from "react-icons/bs";

import "./LoggedInStyles.css";

export default function NoteBar({ date, note }) {
  const [edited, setEdited] = useState(false);

  const [noteObj, setNoteObj] = useState({
    original: note,
    updated: note,
  });

  const handleChangeText = (e) => {
    setNoteObj({ original: noteObj.original, updated: e.target.value });
    if (e.target.value != noteObj.original) {
      setEdited(true);
    } else {
      setEdited(false);
    }
    console.log(e.target.value);
  };

  return (
    <div className="notebarContainer">
      <div className="notebarLeft">
        <p>{date}</p>
        <div className="notebarDivider"> </div>
        <input
          className="noteInput"
          value={noteObj.updated}
          onChange={handleChangeText}
        />
      </div>
      <div className="notebarRight">
        <BsPenFill
          color="beige"
          className="editedIcon"
          style={{ display: edited ? "" : "none" }}
        />
        <BsTrash color="beige" style={{ paddingInline: "8px" }} />
      </div>
    </div>
  );
}
