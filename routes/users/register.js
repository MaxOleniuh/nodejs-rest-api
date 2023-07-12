const express = require("express");
const { validateRegister } = require("../../models/validateContacts");
const { schemas } = require("../../models/user");
const { register } = require("../../controllers/auth.contoller");
const router = express.Router();

router.post("/", validateRegister(schemas.registerSchema), register);

module.exports = router;
