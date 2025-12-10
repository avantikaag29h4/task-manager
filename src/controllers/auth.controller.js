
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, age, phone, email, username, password, confirm_password } = req.body;

        // 1. Validate fields
        if (!name || !email || !username || !password || !confirm_password) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 2. Check if email or username already exists
        const [existingUser] = await db.execute(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [email, username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email or username already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert user into DB
        await db.execute(
            "INSERT INTO users (name, age, phone, email, username, password) VALUES (?, ?, ?, ?, ?, ?)",
            [name, age, phone, email, username, hashedPassword]
        );

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup };





const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please provide username and password" });
        }

        const [user] = await db.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user[0].id, username: user[0].username },
            "your_jwt_secret_key", // replace with env variable in real apps
            { expiresIn: "1h" }
        );

        return res.status(200).json({ message: "Login successful", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signup, login };
