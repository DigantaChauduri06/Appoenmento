const User = require('../models/userModel')


const bcrypt = require('bcrypt');
const status = require('http-status');
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { password, email, name } = req.body
        if (!password || !email || !name) {
            return res
                .status(status.NO_CONTENT)
                .send({ message: 'Name, password and email can not be undefined', success: false })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res
                .status(status.CONFLICT)
                .send({ message: 'User already exists', success: false })
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const encryptedPassword = await bcrypt.hash(password, salt)
        req.body.password = encryptedPassword
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).send({ success: true, message: "User Created Successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Error creating user" })
    }
}


exports.login = async (req, res) => {
    try {
        const { password, email } = req.body
        if (!password || !email) {
            return res
                .status(status.NO_CONTENT)
                .send({ message: 'Name, password and email can not be undefined', success: false })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res
                .status(208)
                .send({ message: 'User does not exists', success: false })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res
                .status(401)
                .send({ message: 'Password is Incorrect', success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
            expiresIn: '3d'
        })
        res.status(status.OK).send({ message: "Login Successful", success: true, data: token })
    } catch (err) {

    }
}

exports.userInfo = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res.status(status.UNAUTHORIZED).send({ success: false, message: 'User doesnot exist' })
        }
        res.status(status.OK).send({
            success: true, data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (e) {
        res.status(500).send({ message: 'Error getting user info', success: false })
    }
}