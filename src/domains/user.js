const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password, role = "USER") => await prisma.user.create({
  data: {
    username,
		role: role,
    passwordHash: await bcrypt.hash(password, 6)
  }
})

const getUsersDb = async () => await prisma.user.findMany()

const getUserByUsernameDb = async (username) => await prisma.user.findUnique({
	where: {
		username
	}
	})

const getUserByIdDb = async (id) => await prisma.user.findUnique({
	where: {
		id
	}
	})

module.exports = {
  createUserDb,
	getUserByUsernameDb,
	getUserByIdDb,
	getUsersDb
}
