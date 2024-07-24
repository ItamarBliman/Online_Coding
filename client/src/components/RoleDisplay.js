import React from "react";

const RoleDisplay = ({ role, numStudents }) => (
  <div>
    <h2>Role: {role}</h2>
    {role && <p>Number of Students: {numStudents}</p>}
  </div>
);

export default RoleDisplay;
