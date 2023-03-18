const User = require("./../models/User");
const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const response = await User.create({
      name: req.body.name,
      birthday: req.body.birthday,
      email: req.body.birthday,
      password: hashedPassword
    })

    res.json({ id: response.id })
  } catch (err) {
    res.json({ error: err.message });
  }
}