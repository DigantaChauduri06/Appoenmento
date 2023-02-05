const express = require('express');
const {
    getDoctorInfo,
    updateDoctorInfo,
    getDoctorInfoById
} = require('../Controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router();


router.post('/get-doctor-info-by-id', authMiddleware, getDoctorInfo)
router.post('/update-doctor-info-by-id', authMiddleware, updateDoctorInfo)
router.post('/get-doctor-info-by-doctorId', authMiddleware, getDoctorInfoById)




module.exports = router