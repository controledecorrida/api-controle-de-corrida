require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const crypto = require('./../crypto');
const { userSchema } = require("../../schemas/user");
const { validateBody } = require("../../utils/validateBody");

console.log(process.env.SECRET_KEY)

const loginService = async ({ email, password }) => {
  validateBody(userSchema, { email, password });

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw new Error("Wrong e-mail or password.");
  }

  const passwordMatch = crypto.validatePassword(password, user.password);

  if (!passwordMatch) {
    throw new Error("Wrong e-mail or password.");
  }

  const token = jwt.sign(
    {
      email,
    },
    String(process.env.SECRET_KEY),
    {
      subject: user.id.toString(),
      expiresIn: "5h",
    }
  );

  return token;
};

module.exports = loginService;