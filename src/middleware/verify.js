const { verifyToken, extractToken, hasAuthorization } = require("../utils/authentication.js")

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
	console.log(token,token.sub)
	next()
}

module.exports = { checkToken, isAdmin }