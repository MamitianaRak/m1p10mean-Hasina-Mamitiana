const { inscription } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post(
    "/signup",inscription.checkDuplicateEmail,controller.signup
  );

  app.post("/signin", controller.signin);

  app.post("/signout", controller.signout);

  app.get("/confirm/:confirmationCode", controller.verifyUser);
};