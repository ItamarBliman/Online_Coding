const io = require("socket.io-client");
const http = require("http");
const socketIo = require("socket.io");
const chai = require("chai");
const expect = chai.expect;
const server = require("../index"); // Adjust path if necessary

let ioServer;
let clientSocket;

before((done) => {
  ioServer = socketIo(server);
  clientSocket = io.connect("http://localhost:3000");
  clientSocket.on("connect", done);
});

after(() => {
  clientSocket.disconnect();
  ioServer.close();
});

it("should handle socket connection", (done) => {
  clientSocket.on("connect", () => {
    expect(clientSocket.connected).to.be.true;
    done();
  });
});
