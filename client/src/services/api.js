import axios from "axios";

// Define the base URL for the API
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Fetch code blocks from the server
export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/codeblocks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

export const fetchCodeBlockById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/codeblocks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching code block:", error);
    throw error;
  }
};
