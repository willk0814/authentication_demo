import React, { useState } from "react";

import { BsPenFill, BSTRas, BsTrash } from "react-icons/bs";

import "./LoggedInStyles.css";

export default function NoteBar({
  id,
  date,
  content,
  penHandler,
  trashCanHandler,
}) {
  console.log(id);
  const [edited, setEdited] = useState(false);
  const [noteObj, setNoteObj] = useState({
    original: content,
    updated: content,
  });

  const handleChangeText = (e) => {
    setNoteObj({ original: noteObj.original, updated: e.target.value });
    if (e.target.value != noteObj.original) {
      setEdited(true);
    } else {
      setEdited(false);
    }
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
        <div className="editedIcon">
          <BsPenFill
            color="beige"
            style={{ display: edited ? "" : "none" }}
            onClick={() => penHandler(date, noteObj.updated)}
          />
        </div>
        <div className="trashIcon">
          <BsTrash
            color="beige"
            style={{ paddingInline: "8px" }}
            onClick={() => {
              trashCanHandler(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
