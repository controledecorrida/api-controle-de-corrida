const User = require("./../models/User");
const loginService = require("./../services/session/loginService");
const crypto = require("./../services/crypto");

exports.signUp = async (req, res, next) => {
  try {
    const cryptoPassword = crypto.createCryptoPassword(req.body.password);

    const response = await User.create({
      name: req.body.name,
      birthday: req.body.birthday,
      email: req.body.email,
      password: cryptoPassword
    })

    res.json({ id: response.id })
  } catch (err) {
    res.json({ error: err });
  }
}

exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const token = await loginService({ email, password });
      
      return res.status(200).json({ token });
  } catch (error) {
      return res.status(403).json({ erro: error.message })
  }  
  
  };