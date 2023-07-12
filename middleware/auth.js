const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
