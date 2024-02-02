const express = require("express");
const {
  createUser,
	getUsers,
	authenticate
} = require('../controllers/user');

const { checkToken, isAdmin }  = require("../middleware/verify")

const router = express.Router();

//prefix: "/users/"
router.get("/auth", authenticate)
router.post("/", createUser);
router.get("/", isAdmin, getUsers);

module.exports = router;
