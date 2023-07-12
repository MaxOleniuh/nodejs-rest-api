const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ password: hashedPassword, email, name });
  try {
    const { subscription, email } = user;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user) {
    res.status(401).json({ message: "User doesn`t exist!" });
    return;
  }
  if (!comparePassword) {
    res.status(401).json({ message: "Email or password is wrong" });
    return;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  res.json(token);
};
module.exports = {
  register,
  login,
};
