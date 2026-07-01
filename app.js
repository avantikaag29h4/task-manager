const express = require("express");
const cors = require('cors');
const app = express();
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

const corsOptions = { origin: 'http://localhost:3000' };

app.use(cors(corsOptions));

// Handle preflight for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task Manager API Running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(5000, "0.0.0.0", () => {
    console.log("Server running on port 5000");
});