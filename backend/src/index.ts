// Load environment variables from .env into process.env
import "dotenv/config";

// Import the express library we just installed
import express from "express";
// Import bcrypt for password hashing
import bcrypt from "bcrypt";
// Import our shared Prisma Client instance
import prisma from "./prisma";

// Create an "app" — this represents our whole web server
const app = express();

// Tell Express to automatically parse incoming JSON request bodies
// Without this, req.body would be undefined when a client sends JSON
app.use(express.json());

// Define the port (a "door number" on your computer) the server will listen on
const PORT = 3000;

// Define a route: when someone visits GET /health, run this function
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Signup route: creates a new user account
app.post("/auth/signup", async (req, res) => {
  // Pull the expected fields out of the request body
  const { universityEmail, name, password, facultyId, yearOfStudy } = req.body;

  // Basic check: make sure required fields were actually sent
  if (!universityEmail || !name || !password || !facultyId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Loose check that the email looks academic (contains .edu or .ac.)
  const looksAcademic = /\.edu(\.|$)|\.ac\.[a-z]{2,}/i.test(universityEmail);
  if (!looksAcademic) {
    return res.status(400).json({ error: "Please use a university email address" });
  }

  // Hash the password before storing it — never save plain text passwords
  // The "10" is the salt rounds — a cost factor controlling how slow/secure the hash is
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    // Create the new user in the database
const user = await prisma.user.create({
  data: {
    universityEmail,
    name,
    passwordHash,
    facultyId,
    yearOfStudy: yearOfStudy ?? null,
  },
});

    res.status(201).json({ message: "Account created", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong creating your account" });
  }
});

// Start the server listening on our chosen port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});