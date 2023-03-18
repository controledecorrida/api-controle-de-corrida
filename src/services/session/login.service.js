require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require('bcrypt');

const LoginService = async ({email, password}) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("Wrong e-mail or password.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Wrong e-mail or password.");
  }

  const token = jwt.sign(
    {
      id,
    },
    String(process.env.SECRET_KEY),
    {
      subject: user.id,
      expiresIn: "5h",
    }
  );

  return token;
};

module.exports = LoginService;