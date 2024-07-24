import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CodeBlockPage from "./CodeBlockPage";
import axios from "axios";
import io from "socket.io-client";
import { jest } from "@jest/globals";

// Mock axios
jest.mock("axios");
const mockSocket = {
  emit: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

jest.mock("socket.io-client", () => () => mockSocket);

describe("CodeBlockPage", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { code: "initial code", name: "Test Code Block" },
    });
    mockSocket.emit.mockClear();
    mockSocket.on.mockClear();
  });

  test("renders and fetches data correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/codeblock/1"]}>
        <Routes>
          <Route path="/codeblock/:id" element={<CodeBlockPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Test Code Block")).toBeInTheDocument();
    expect(screen.getByText("Back to Lobby")).toBeInTheDocument();
  });

  test("handles code matching alert", async () => {
    render(
      <MemoryRouter initialEntries={["/codeblock/1"]}>
        <Routes>
          <Route path="/codeblock/:id" element={<CodeBlockPage />} />
        </Routes>
      </MemoryRouter>
    );

    mockSocket.on.mockImplementation((event, callback) => {
      if (event === "codeMatched") {
        callback(true); // Simulate code matched
      }
    });

    await waitFor(() => {
      expect(
        screen.getByText("😊 You have matched the solution!")
      ).toBeInTheDocument();
    });
  });

  test("navigates back to lobby and leaves room", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/codeblock/1"]}>
        <Routes>
          <Route path="/codeblock/:id" element={<CodeBlockPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Back to Lobby"));

    expect(mockSocket.emit).toHaveBeenCalledWith("leaveRoom", {
      codeBlockId: "1",
    });
  });
});
