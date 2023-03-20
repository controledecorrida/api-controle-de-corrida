const LoginService = require("../../services/session/login.service");

exports.userLoginController = async (req, res) => {

try {
    const { email, password } = req.body;
    const token = await LoginService({ email, password });
    
    return res.status(200).json({ token });
} catch (error) {
    return res.status(403).json({ erro: error.message })
}  

};
