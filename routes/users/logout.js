const express = require("express");
const { logout } = require("../../controllers/auth.contoller");
const authMiddleware = require("../../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware, logout);

module.exports = router;
