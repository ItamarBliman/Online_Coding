import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import CodeEditor from "../components/CodeEditor";
import HintRequest from "../components/HintRequest";
import MentorControls from "../components/MentorControls";
import RoleDisplay from "../components/RoleDisplay";

// src/pages/CodeBlockPage.js
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3001";
const socket = io(SOCKET_URL);

// CodeBlockPage component definition
const CodeBlockPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [role, setRole] = useState("student");
  const [numStudents, setNumStudents] = useState(0);
  const [codeBlockName, setCodeBlockName] = useState("");
  const [hint, setHint] = useState("");
  const [hintRequested, setHintRequested] = useState(false);
  const [mentorHint, setMentorHint] = useState("");
  const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown

  // Fetch code block data and set up socket event listeners
  useEffect(() => {
    axios
      .get(`/api/codeblocks/${id}`)
      .then((response) => {
        setCode(response.data.code);
        setCodeBlockName(response.data.name);
      })
      .catch((error) => console.error("Error fetching code block:", error));

    const handleCodeUpdate = (newCode) => setCode(newCode);
    const handleRoleUpdate = (newRole) => setRole(newRole);
    const handleNumStudentsUpdate = (newNum) => setNumStudents(newNum);
    // Alert user when code is matched to the solution
    const handleCodeMatched = (matched) => {
      if (matched && !alertShown) {
        alert("😊 You've matched the solution!");
        setAlertShown(true); // Update state to prevent multiple alerts
      }
    };
    // Alert and return to lobby when mentor leaves the room
    const handleMentorLeft = () => {
      alert("Mentor has left the room. Redirecting to the main page...");
      setCode("");
      navigate("/");
    };
    const handleHintRequested = () => setHintRequested(true);
    const handleHintReceived = (receivedHint) => {
      setHint(receivedHint);
      setHintRequested(false);
    };

    // Join room and set up event listeners
    socket.emit("joinRoom", { codeBlockId: id });
    socket.on("codeUpdate", handleCodeUpdate);
    socket.on("roleUpdate", handleRoleUpdate);
    socket.on("numStudentsUpdate", handleNumStudentsUpdate);
    socket.on("codeMatched", handleCodeMatched);
    socket.on("mentorLeft", handleMentorLeft);
    socket.on("hintRequested", handleHintRequested);
    socket.on("hintReceived", handleHintReceived);

    // Clean up event listeners
    return () => {
      socket.off("codeUpdate", handleCodeUpdate);
      socket.off("roleUpdate", handleRoleUpdate);
      socket.off("numStudentsUpdate", handleNumStudentsUpdate);
      socket.off("codeMatched", handleCodeMatched);
      socket.off("mentorLeft", handleMentorLeft);
      socket.off("hintRequested", handleHintRequested);
      socket.off("hintReceived", handleHintReceived);
    };
  }, [id, navigate, alertShown]);

  const handleChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { codeBlockId: id, newCode });
  };

  const handleBackToLobby = () => {
    socket.emit("leaveRoom", { codeBlockId: id });
    navigate("/");
  };

  const requestHint = () => {
    socket.emit("hintRequest", { codeBlockId: id });
    setHintRequested(true);
  };

  const submitHint = () => {
    if (mentorHint) {
      socket.emit("provideHint", { codeBlockId: id, hint: mentorHint });
      alert("Hint submitted!");
      setMentorHint("");
    }
  };

  return (
    <div>
      <button onClick={handleBackToLobby}>Back to Lobby</button>
      <h1>{codeBlockName}</h1>
      <RoleDisplay role={role} numStudents={numStudents} />
      <CodeEditor
        code={code}
        onChange={role === "student" ? handleChange : null}
        readOnly={role === "mentor"}
      />
      {role === "student" && (
        <HintRequest
          hint={hint}
          hintRequested={hintRequested}
          requestHint={requestHint}
        />
      )}
      {role === "mentor" && (
        <MentorControls
          mentorHint={mentorHint}
          setMentorHint={setMentorHint}
          submitHint={submitHint}
        />
      )}
    </div>
  );
};

export default CodeBlockPage;
