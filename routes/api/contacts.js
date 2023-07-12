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

const router = express.Router();

router.get("/", listContacts);

router.get(`/:id`, checkValidId, getContactById);
router.post("/", validatePostContact(contactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validatePutContact(contactSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  checkValidId,
  validatePatchContact(contactPatchSchema),
  updateStatusContact
);

module.exports = router;
