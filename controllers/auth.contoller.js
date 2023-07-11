const { User } = require("../models/user");

const register = async (req, res) => {
  const user = await User.create(req.body);
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
