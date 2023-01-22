const express = require('express');
const {
    getAllDoctors, getAllUsers, changeDoctorStatus
} = require('../Controllers/adminController');
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router();


router.get('/get-all-doctors', authMiddleware, getAllDoctors)
router.get('/get-all-users', authMiddleware, getAllUsers)
router.post('/change-doctor-status', authMiddleware, changeDoctorStatus)



module.exports = router