const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        // console.log("Auth ", token);
        jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
            console.log(err);
            if (err) {
                return res
                    .status(401)
                    .send({ message: 'Auth failed', success: false })
            }
            // console.log(decoded.id);
            req.body.userId = decoded.id
            next()
        })
    } catch (e) {
        return res.status(401).send({ success: false, message: 'Auth failed' })
    }
}