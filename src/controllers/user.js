const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createUserDb } = require('../domains/user.js')
const { hashPassword, comparePassword } = require("../utils/authentication.js")

const createUser = async (req, res) => {
  const {
    username,
    password
  } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: "Missing fields in request body"
    })
  }

  try {
    const createdUser = await createUserDb(username, password, "USER")

    return res.status(201).json({ user: createdUser })
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: "A user with the provided username already exists" })
      }
    }

    return res.status(500).json({ error: "something went wrong" })
  }
}

module.exports = {
  createUser
}
