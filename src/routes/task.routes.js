const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { createCategory,createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTask } = require("../controllers/task.controller");

// All routes protected by JWT
router.post("/categories", auth, createCategory);
router.post("/", auth, createTask);
router.get("/", auth, getAllTasks);
// router.get("/filtered_tasks", auth, getTask);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
// router.get("/filtered_tasks", auth, getTask);

module.exports = router;
