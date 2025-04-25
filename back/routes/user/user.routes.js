const express = require("express");
const router = express.Router();
const authenticationController = require("../../controllers/authentication/auth.controller");
const userController = require("../../controllers/user/user.controller");
const authMiddleware = require("../../middleware/auth.middleware");

router.get("/users", authenticationController.getAllUsers);
router.post("/users", authenticationController.createUser);

router.get("/user", authMiddleware, userController.getUserData);

module.exports = router;
