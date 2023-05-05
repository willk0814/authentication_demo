import React from "react";

export default function Header() {
  return (
    <div className="headerContainer">
      <h1 className="titleText">Welcome to my registration demo</h1>
      <p className="headerText">
        This is a project I have done to develop and display the following
        skills
      </p>
      <ul className="headerList">
        <li className="headerListItem">Front end developement in React.js</li>
        <li className="headerListItem">
          API developement and usage with Express.js and Node.js
        </li>
        <li className="headerListItem">
          Data storage and retrieval with MongoDB and mongoose.js
        </li>
      </ul>
    </div>
  );
}
