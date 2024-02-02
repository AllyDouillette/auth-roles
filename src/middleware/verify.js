const { verifyToken } = require("../utils/authentication.js")

const checkToken = (req, res, next) => {
	const authentication = req.header("authorization")

	if (!authentication) {
		res.status(400).json({
      error: "Missing authorization in request body"
    })
	}

	const [_, token] = authentication
	const decodedToken = verifyToken(token)

	if (!decodedToken) {
		return res.status(401).json({
      error: "unautorized"
    })
	}

	next()
}

module.exports = { checkToken }