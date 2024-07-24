import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCodeBlocks } from "../services/api";

function LobbyPage() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    // fetch code blocks from the server
    async function getCodeBlocks() {
      try {
        const data = await fetchCodeBlocks();
        setCodeBlocks(data);
      } catch (error) {
        console.error("Error fetching code blocks:", error);
      }
    }
    getCodeBlocks();
  }, []);

  return (
    <div>
      <h1>Lobby</h1>
      <h2>Choose code block:</h2>
      <ul>
        {codeBlocks.map((codeBlock) => (
          <li key={codeBlock._id}>
            <Link to={`/codeblocks/${codeBlock._id}`}>{codeBlock.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LobbyPage;
