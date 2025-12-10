const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");

// All routes protected by JWT
router.post("/", auth, createTask);
router.get("/", auth, getAllTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
