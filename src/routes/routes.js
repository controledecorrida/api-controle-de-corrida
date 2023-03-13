const UserControllers = require("./../controllers/UserControllers");

module.exports = (app) => {
  app.post("/signUp", UserControllers.signUp)
};
