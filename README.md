# Online Coding Web Application

## Project Overview

This application is designed to help Tom, a professional JavaScript lecturer, to monitor and assist his students' coding progress remotely. The application features a lobby page and a code block page to facilitate real-time coding interactions.

## Features

### Lobby Page:

- Displays a list of the code blocks from the database.
- Clicking on an item redirects users to the corresponding code block page.

### Code Block Page:

- Contains a title and a text editor with an initial code template.
- Displays a role indicator (student/mentor).
- The first user to open the page is the mentor (Tom). Subsequent users are considered students.
- If Tom leaves the page, students are redirected to the lobby page, and any written code is deleted.
- Mentors see the code in a read-only mode.
- Students can edit the code.
- Code changes are synchronized in real-time using WebSockets.
- The code editor features syntax highlighting.
- Displays the number of students currently in the room.
- An alert is shown when the student’s code matches the solution.
- A student can ask for a hint from the mentor. The mentor can provide a hint that will show only to students who asked for it

## Technologies Used

- Client: React
- Server: Node.js with Express
- Database: Non-Relational (e.g., MongoDB)
- WebSocket: Socket.io for real-time communication
