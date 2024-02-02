const { verifyToken, extractToken, hasAuthorization } = require("../utils/authentication.js")
const { getUserByIdDb } = require("../domains/user.js")

const checkToken = (req, res, next) => {
	if (!hasAuthorization(req)) {
		res.status(400).json({
      error: "Missing authorization in request body"
    })
	}

	const token = extractToken(req).token
	const decodedToken = verifyToken(token)

	if (!decodedToken) {
		return res.status(401).json({
      error: "unautorized"
    })
	}

	next()
}

const isAdmin = (req, res, next) => {
	const token = extractToken(req).token

	const userId = verifyToken(token).sub
	const user = getUserByIdDb(userId)

	if (user.id !== "ADMIN") {
		return res.status(401).json({ error: "Unauthorized"})
	}

	next()
}

module.exports = { checkToken, isAdmin }