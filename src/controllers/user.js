const { PrismaClientKnownRequestError } = require("@prisma/client")
const { createUserDb, getUsersDb, getUserDb } = require('../domains/user.js')
const { hashPassword, comparePassword, createToken, verifyToken } = require("../utils/authentication.js")

const authenticate = async (req, res) => {
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
		const user = await getUserDb(username)

		if ( await comparePassword(password, user.passwordHash) ) {
			const token = createToken({ sub: user.id })
			return res.status(200).json({ token })
		}
	} catch (error) {
		return res.status(401).json({ error: "invalid credentials"})
	}
}

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

const getUsers = async (req, res) => {

	try {
		const users = await getUsersDb()
		return res.json({ users })
	} catch (error) {
		return { error: "something went wrong" }
	}

}

module.exports = {
  createUser,
	getUsers,
	authenticate
}
