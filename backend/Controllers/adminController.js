const User = require('../models/userModel')
const Doctor = require('../models/doctorModel')

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).send({ success: true, message: "Successfuly fetched all doctors", data: doctors })

    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching doctors" })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ success: true, message: "Successfuly fetched all users", data: users })

    } catch (err) {
        res.status(500).send({ success: false, message: "Error fetching users" })
    }
}

exports.changeDoctorStatus = async (req, res) => {
    try {
        const { doctorId, status, userId } = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status })
        const user = await User.findOne({ _id: doctor.userId })
        user.isDoctor = status === 'approved';
        const unseenNotification = user.unseenNotification
        unseenNotification.push({
            type: "doctor-req-changed",
            message: `Your doctor account has been ${status}`,
            onClickPath: "/notifications"
        })
        await user.save()
        // const doctors = await Doctor.find({})
        res.status(200).send({ success: true, message: "successfuly changed status doctor account", data: doctor })

    } catch (err) {
        res.status(500).send({ success: false, message: "Error updating status" })
    }
}