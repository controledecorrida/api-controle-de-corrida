const crypto = require("crypto");

exports.createCryptoPassword = (password) => {
  const hash = crypto.createHash('sha512');
  hash.update(password);

  const cryptoPassword = hash.digest("hex");
  
  return cryptoPassword;
}

exports.validatePassword = (password, storedPassword) => {
  const hash = crypto.createHash("sha512");
  hash.update(password);

  const verifyPassword = hash.digest("hex");

  return verifyPassword === storedPassword;
}