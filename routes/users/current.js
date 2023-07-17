const express = require("express");
const { current } = require("../../controllers/auth.contoller");
const authMiddleware = require("../../middleware/auth");
const router = express.Router();

router.post("/", authMiddleware, current);

module.exports = router;
