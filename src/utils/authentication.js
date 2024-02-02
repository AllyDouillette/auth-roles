const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const hashPassword = async (plainPassword) => await bcrypt.hash(plainPassword, 12);

const comparePassword = async (plainPassword, hashedPassword) => await bcrypt.compare(plainPassword, hashedPassword)

const createToken = (payload) => jwt.sign(payload, secret)

const hasAuthorization = (req) => req.header("authorization")

const extractToken = (req) => {
	const authentication = req.header("authorization")
	const [type, token] = authentication.split(" ")
	return { type, token } 
}

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
	hasAuthorization,
	extractToken,
	verifyToken
	}