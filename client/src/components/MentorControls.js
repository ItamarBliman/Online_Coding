import React from "react";

const MentorControls = ({ mentorHint, setMentorHint, submitHint }) => (
  <div className="mentor-controls">
    <p>Provide a Hint:</p>
    <textarea
      value={mentorHint}
      onChange={(e) => setMentorHint(e.target.value)}
    />
    <button onClick={submitHint}>Submit Hint</button>
  </div>
);

export default MentorControls;
