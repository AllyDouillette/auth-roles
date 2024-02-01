const { bcrypt } = require("bcrypt")

const hashPassword = async (plainPassword) => await bcrypt.hash(plainPassword, 12);

const comparePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

module.exports = { 
	hashPassword,
	comparePassword
	}