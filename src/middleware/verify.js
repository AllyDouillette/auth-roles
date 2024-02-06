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

const isAdmin = async (req, res, next) => {
	const token = extractToken(req).token

	const userId = verifyToken(token).sub
	const user = await getUserByIdDb(userId)

	if (user.role !== "ADMIN") {
		return res.status(403).json({ error: "missing permissions"})
	}

	next()
}

const isAdminOrSelf = async (req, res, next) => {
	const token = extractToken(req).token
	const id = Number(req.params.id)
	const userId = verifyToken(token).sub

	if (userId === id) {
		next()
	}

	const user = await getUserByIdDb(userId)
	if (user.role !== "ADMIN") {
		return res.status(403).json({ error: "missing permissions"})
	}

	next()

}

module.exports = { checkToken, isAdmin, isAdminOrSelf }
