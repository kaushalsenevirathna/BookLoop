// Import the express library we just installed
import express from "express";

// Create an "app" — this represents our whole web server
const app = express();

// Define the port (a "door number" on your computer) the server will listen on
const PORT = 3000;

// Define a route: when someone visits GET /health, run this function
app.get("/health", (req, res) => {
  // Send back a simple JSON response confirming the server is alive
  res.json({ status: "ok", message: "Server is running" });
});

// Start the server listening on our chosen port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});