const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { signup, login, deleteUser } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.delete("/delete-account",auth,deleteUser);
module.exports = router;