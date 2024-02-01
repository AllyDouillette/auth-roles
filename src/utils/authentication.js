const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

const hashPassword = async (plainPassword) => await bcrypt.hash(plainPassword, 12);

const comparePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

const createToken = (payload, secret) => jwt.sign(payload, secret)

const verifyToken = (token, secret) => {
	try {
		return jwt.verify(token, secret)
	} catch (error) {
		return false
	}
}

module.exports = { 
	hashPassword,
	comparePassword,
	createToken,
	verifyToken
	}