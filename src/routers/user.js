const express = require("express");
const {
  createUser,
	getUsers,
	authenticate
} = require('../controllers/user');

const { checkToken }  = require("../middleware/verify")

const router = express.Router();

//prefix: "/users/"
router.get("/auth", authenticate)
router.post("/", createUser);
router.get("/", checkToken, getUsers);

module.exports = router;
