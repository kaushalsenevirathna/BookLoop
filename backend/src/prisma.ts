// Import the auto-generated Prisma Client
import { PrismaClient } from "@prisma/client";

// Create a single shared instance of the client to reuse across the app
// (creating a new one per request would waste connections)
const prisma = new PrismaClient();

export default prisma;