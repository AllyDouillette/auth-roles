const prisma = require('../utils/prisma')
const bcrypt = require('bcrypt')

const createUserDb = async (username, password, role) => await prisma.user.create({
  data: {
    username,
    passwordHash: await bcrypt.hash(password, 6),
		role: role ? role : "USER"
  }
})

const getUsersDb = async () => await prisma.user.findMany()

const getUserDb = async (username) => await prisma.user.findUnique({
	data: {
		username
	}
})

module.exports = {
  createUserDb,
	getUserDb,
	getUsersDb
}
