const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const mongoose = require("mongoose");
const PORT = 3000;
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/users");
const { nanoid } = require("nanoid");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const DB_HOST = process.env.DB_HOST;

const tempDir = path.join(__dirname, "temp");
const avatarDir = path.join(__dirname, "public", "avatars");
const user = [];
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: multerConfig,
});

app.set("json spaces", 8);

app.set("json spaces", 8);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.post("/users/avatars", upload.single("avatar"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);

  await fs.rename(tempUpload, resultUpload);
  const avatar = path.join("public", "avatars", originalname);
  const newUser = {
    ...req.body,
    id: nanoid(),
    avatar,
  };
  user.push(newUser);
  res.json(newUser);
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

mongoose
  .connect(DB_HOST)
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1);
  });
