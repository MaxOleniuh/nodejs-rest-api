const express = require("express");

const { validatePostContact } = require("../../models/validateContacts");
const { schemas } = require("../../models/user");
const { login } = require("../../controllers/auth.contoller");
const router = express.Router();

router.post("/", validatePostContact(schemas.loginSchema), login);

module.exports = router;
