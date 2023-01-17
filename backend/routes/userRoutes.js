const express = require('express');
const {
    register,
    login,
    userInfo
} = require('../Controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router();

router.get("/", (req, res) => res.send({ message: "Hello There" }))

router.post('/register', register)
router.post('/login', login)
router.post('/get-user-info-by-id', authMiddleware, userInfo)

module.exports = router