const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const userController = require("../controllers/userController")

router.route("/").get(authController.greetings)

router.route("/auth/login").post(authController.login)

router.route("/auth/register").post(authController.register)

router.route("/user/:id/dashboard").get(userController.dashboard)

module.exports = router
