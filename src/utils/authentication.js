const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const hashPassword = async (plainPassword) => await bcrypt.hash(plainPassword, 12);

const comparePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

const createToken = (payload) => jwt.sign(payload, secret)

const verifyToken = (token) => {
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