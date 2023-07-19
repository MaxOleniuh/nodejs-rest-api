const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  validatePostContact,
  validatePutContact,
  validatePatchContact,
} = require("../../models/validateContacts");
const {
  contactSchema,
  contactPatchSchema,
} = require("../../models/contactsSchema");
const checkValidId = require("../../middleware/checkValidId");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

router.get("/", listContacts);

router.get(`/:id`, authMiddleware, checkValidId, getContactById);

router.post(
  "/",
  authMiddleware,
  validatePostContact(contactSchema),
  addContact
);

router.delete("/:contactId", authMiddleware, removeContact);

router.put(
  "/:contactId",
  authMiddleware,
  checkValidId,
  validatePutContact(contactSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  validatePatchContact(contactPatchSchema),
  updateStatusContact
);

module.exports = router;
