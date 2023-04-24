import React, { useEffect, useState } from "react";

export default function PassProgressBar({ progress }) {
  const [progressPercent, setProgressPercent] = useState(0);
  useEffect(() => {
    // convert progress to percent
    const progPercent = (progress / 8) * 100;
    setProgressPercent(progPercent);
  }, [progress]);
  return (
    <div className="progressBarContainer">
      <div
        className="progressBar"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
}
