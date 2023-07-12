const { Schema, model } = require("mongoose");

const contactSchemaMongoose = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { toJSON: { versionKey: false } }
);

const Contact = model("contact", contactSchemaMongoose);

module.exports = {
  Contact,
};
