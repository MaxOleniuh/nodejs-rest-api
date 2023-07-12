const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  //   const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, 10);
  console.log(result);
  //   const passwordCompare1 = await bcrypt.compare(password, result);
  //   const passwordCompare2 = await bcrypt.compare("12345", result);
};

hashPassword("199000");
