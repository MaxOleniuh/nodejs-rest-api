const { User } = require("../models/user");
const bcrypt = require("bcryptjs");

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

module.exports = {
  register,
};
