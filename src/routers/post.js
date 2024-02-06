const express = require("express");
const { createPost,
deletePost } = require("../controllers/post");

const { checkToken, isAdmin, isAdminOrSelf } = require("../middleware/verify");
const router = express.Router();

//prefix: "/posts"
router.post("/", checkToken, createPost);
router.delete("/:id", isAdminOrSelf, deletePost);

module.exports = router;
