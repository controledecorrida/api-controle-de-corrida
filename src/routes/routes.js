const { userLoginController } = require("../controllers/session/loginControllers");
const UserControllers = require("./../controllers/UserControllers");

module.exports = (app) => {
  app.post("/signUp", UserControllers.signUp)
  app.post("/login", userLoginController)
};
