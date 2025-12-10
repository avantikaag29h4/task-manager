const db = require("../config/db");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const user_id = req.user.id; // from auth middleware

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const [result] = await db.execute(
            "INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)",
            [user_id, title, description || "", status || "TODO"]
        );

        return res.status(201).json({ message: "Task created successfully", task_id: result.insertId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all tasks for logged-in user
const getAllTasks = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [tasks] = await db.execute(
            "SELECT * FROM tasks WHERE user_id = ?",
            [user_id]
        );

        return res.status(200).json({ tasks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get single task by id
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const [tasks] = await db.execute(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            [id, user_id]
        );

        if (tasks.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({ task: tasks[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const user_id = req.user.id;

        const [task] = await db.execute(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            [id, user_id]
        );

        if (task.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        await db.execute(
            "UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ? AND user_id = ?",
            [title || task[0].title, description || task[0].description, status || task[0].status, id, user_id]
        );

        return res.status(200).json({ message: "Task updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const [task] = await db.execute(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
            [id, user_id]
        );

        if (task.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        await db.execute(
            "DELETE FROM tasks WHERE id = ? AND user_id = ?",
            [id, user_id]
        );

        return res.status(200).json({ message: "Task deleted successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
