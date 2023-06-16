import React, { useState } from "react";

import { BsPenFill, BSTRas, BsTrash } from "react-icons/bs";

import "./LoggedInStyles.css";

export default function NewNoteBar({ id, date, penHandler, trashCanHandler }) {
  const [noteContent, setNoteContent] = useState("");

  const createNewNote = () => {
    penHandler(date, noteContent);
    setNoteContent("");
  };

  // const handleChangeText = (e) => {
  //   setNoteObj({ original: noteObj.original, updated: e.target.value });
  //   if (e.target.value != noteObj.original) {
  //     setEdited(true);
  //   } else {
  //     setEdited(false);
  //   }
  // };

  return (
    <div className="notebarContainer">
      <div className="notebarLeft">
        <p>{date}</p>
        <div className="notebarDivider"> </div>
        <input
          className="noteInput"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
      </div>
      <div className="notebarRight">
        <div className="editedIcon">
          <BsPenFill
            color="beige"
            style={{
              display: noteContent !== "" ? "" : "none",
              paddingInline: "8px",
            }}
            onClick={() => createNewNote()}
          />
        </div>
        {/* <div className="trashIcon">
          <BsTrash
            color="beige"
            style={{ paddingInline: "8px" }}
            onClick={() => {
              trashCanHandler(id);
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
