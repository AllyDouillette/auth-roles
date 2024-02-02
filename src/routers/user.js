const express = require("express");
const {
  createUser,
	getUsers,
} = require('../controllers/user');

const { checkToken }  = require("../middleware/verify")

const router = express.Router();

//prefix: "/users/"
router.post("/", createUser);
router.get("/", checkToken, getUsers);

module.exports = router;
