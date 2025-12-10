const express = require("express");
const app = express();
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task Manager API Running");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
