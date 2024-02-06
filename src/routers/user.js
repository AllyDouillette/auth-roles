const express = require("express");
const {
  createUser,
	getUsers,
	authenticate,
	deleteUser
} = require('../controllers/user');

const { checkToken, isAdmin, isAdminOrSelf }  = require("../middleware/verify")

const router = express.Router();

//prefix: "/users"
router.get("/auth", authenticate)
router.post("/", createUser);
router.get("/", isAdmin, getUsers);
router.delete("/:id", isAdminOrSelf, deleteUser)

module.exports = router;
