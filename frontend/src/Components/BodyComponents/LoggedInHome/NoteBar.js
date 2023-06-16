import React, { useState, useEffect } from "react";

import { BsPenFill, BSTRas, BsTrash } from "react-icons/bs";

import "./LoggedInStyles.css";
import { toContainElement } from "@testing-library/jest-dom/dist/matchers";

export default function NoteBar({
  id,
  date,
  content,
  penHandler,
  trashCanHandler,
}) {
  // const [edited, setEdited] = useState(false);
  const [noteObj, setNoteObj] = useState({
    original: content,
    updated: content,
  });

  // const handleChangeText = (e) => {
  //   setNoteObj({ original: noteObj.original, updated: e.target.value });
  //   if (e.target.value != noteObj.original) {
  //     setEdited(true);
  //   } else {
  //     setEdited(false);
  //   }
  // };

  useEffect(() => {
    setNoteObj({
      original: content,
      updated: content,
    });
  }, [content]);

  return (
    <div className="notebarContainer">
      <div className="notebarLeft">
        <p>{date}</p>
        <div className="notebarDivider"> </div>
        <input
          className="noteInput"
          value={noteObj.updated}
          onChange={(e) => {
            setNoteObj({
              original: noteObj.original,
              updated: e.target.value,
            });
          }}
        />
      </div>
      <div className="notebarRight">
        <div className="editedIcon">
          <BsPenFill
            color="beige"
            style={{
              display: noteObj.original !== noteObj.updated ? "" : "none",
            }}
            onClick={() => penHandler(id, noteObj.updated)}
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
