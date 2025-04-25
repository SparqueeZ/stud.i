const express = require("express");
const router = express.Router();
const authenticationController = require("../../controllers/authentication/auth.controller");

router.post("/auth/register", authenticationController.register);
router.post("/auth/login", authenticationController.login);

module.exports = router;
