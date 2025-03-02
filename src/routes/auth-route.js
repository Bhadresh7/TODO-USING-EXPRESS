const express = require("express");
const { login, register } = require("../controller/auth-controller");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
