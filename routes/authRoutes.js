var auth_controller = require("../controllers/authController");

module.exports = app => {
  //Login with Google Auth
  //app.get("/auth/google", auth_controller.login_google);

  //Callback for Google Auth
 // app.get("/auth/google/callback", auth_controller.google_callback);

  //Signup with local auth (email/password)
  app.post("/auth/signup", auth_controller.signup_local);

  //Login with local auth (email/password)
  app.post("/auth/login", auth_controller.login_local);

  //Logout User
  app.get("/auth/logout", auth_controller.logout_user);

  //Fetch current user
  app.get("/auth/current_user", auth_controller.fetch_current_user);
};
