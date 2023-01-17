const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .send({ message: 'Auth failed', success: false })
            }
            req.body.userId = decoded.id
            next()
        })
    } catch (e) {
        return res.status(401).send({ success: false, message: 'Auth failed' })
    }
}