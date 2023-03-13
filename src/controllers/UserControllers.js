const User = require("./../models/User");

exports.signUp = async (req, res, next) => {
  try {
    // Criar a criptografia da senha antes de passar para o banco de dados
    const response = await User.create({
      name: req.body.name,
      birthday: req.body.birthday,
      email: req.body.birthday,
      password: req.body.password
    })

    res.json({ id: response.id })
  } catch (err) {
    res.json({ error: err.message });
  }
}