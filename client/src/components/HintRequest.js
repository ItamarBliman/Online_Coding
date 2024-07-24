import React from "react";

const HintRequest = ({ hint, hintRequested, requestHint }) => {
  return (
    <div className="hint-request-container">
      <button onClick={requestHint} disabled={hintRequested}>
        {hintRequested ? "Hint Requested" : "Request Hint"}
      </button>
      {hint && <span className="hint-text">{hint}</span>}
    </div>
  );
};

export default HintRequest;
