const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')


exports.getDoctorInfo = async (req, res) => {
    console.log(req.body.userId);
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        // user.password = null;
        res.status(200).send({
            success: true, data: doctor, message: "Doctor fetched successfully"
        })
    } catch (e) {
        res.status(500).send({ message: 'Error getting doctor info', success: false })
    }
}

exports.updateDoctorInfo = async (req, res) => {
    console.log(req.body.userId);
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body)
        // user.password = null;
        res.status(200).send({
            success: true, data: doctor, message: "Successfully updated"
        })
    } catch (e) {
        res.status(500).send({ message: 'Error updating doctor info', success: false })
    }
}