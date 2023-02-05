const express = require('express');
const {
    register,
    login,
    userInfo,
    applyDoctor,
    markSeen,
    deleteAllNotification,
    getAllDoctors
} = require('../Controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router();

router.get("/", (req, res) => res.send({ message: "Hello There" }))

router.post('/register', register)
router.post('/login', login)
router.post('/get-user-info-by-id', authMiddleware, userInfo)
router.post('/apply-doctor', authMiddleware, applyDoctor)
router.post('/mark-all-notification-seen', authMiddleware, markSeen)
router.post('/delete-all-notification-seen', authMiddleware, deleteAllNotification)
router.get('/get-all-approved-doctors', authMiddleware, getAllDoctors)

module.exports = router