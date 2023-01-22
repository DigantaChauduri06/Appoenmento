const express = require('express');
const {
    getDoctorInfo,
    updateDoctorInfo
} = require('../Controllers/doctorController');
const authMiddleware = require('../middlewares/authMiddlewares')


const router = express.Router();


router.post('/get-doctor-info-by-id', authMiddleware, getDoctorInfo)
router.post('/update-doctor-info-by-id', authMiddleware, updateDoctorInfo)




module.exports = router