const express = require("express");
const { createPost } = require("../controllers/post");

const { checkToken, isAdmin, isAdminOrSelf } = require("../middleware/verify");
const router = express.Router();

//prefix: "/posts"
router.post("/", checkToken, createPost);

module.exports = router;
