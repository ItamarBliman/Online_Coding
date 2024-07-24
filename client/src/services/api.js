import axios from "axios";

// Fetch code blocks from the server implemented here to reduce duplication

export const fetchCodeBlocks = async () => {
  try {
    const response = await axios.get("/api/codeblocks");
    return response.data;
  } catch (error) {
    console.error("Error fetching code blocks:", error);
    throw error;
  }
};

export const fetchCodeBlockById = async (id) => {
  try {
    const response = await axios.get(`/api/codeblocks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching code block:", error);
    throw error;
  }
};
