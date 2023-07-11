const express = require("express");
const { validatePostContact } = require("../../models/validateContacts");
const { schemas } = require("../../models/user");
const { register } = require("../../controllers/auth.contoller");
const router = express.Router();

router.post("/", validatePostContact(schemas.registerSchema), register);

module.exports = router;
