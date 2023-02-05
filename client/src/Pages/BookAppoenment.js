import Layout from "../Components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { hideLoading, showLoading } from "../Redux/slice/alertsSlice"
import moment from "moment"
import { Button, Col, DatePicker, Row, TimePicker } from "antd"
import toast from "react-hot-toast"

function BookAppoenment() {
    const [isAvalable, setIsAvalable] = useState(false)
    const [date, setDate] = useState()
    const [selectedTimeing, setSelectedTimeing] = useState()
    const [doctor, setDoctor] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const params = useParams()
    async function getDoctorData() {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/doctor/get-doctor-info-by-doctorId", { doctorId: params.doctorId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                setDoctor(res.data.data)
                dispatch(hideLoading())
            }
        } catch (e) {
            dispatch(hideLoading())
            navigate("/login")

        }
    }
    useEffect(() => {

        getDoctorData()

    }, [])
    const bookNow = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/doctor/book-appoinment", { doctorId: params.doctorId, userId: user._id, date, selectedTimeing, doctorInfo: doctor, userInfo: user }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                dispatch(hideLoading())
                toast.error("Something went wrong".toUpperCase())
            }
        } catch (e) {
            dispatch(hideLoading())
            toast.error("Something went wrong".toUpperCase())

        }

    }
    const checkAvailiblityNow = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/doctor/book-appoinment", { doctorId: params.doctorId, userId: user._id, date, selectedTimeing }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                dispatch(hideLoading())
                toast.error("Something went wrong".toUpperCase())
            }
        } catch (e) {
            dispatch(hideLoading())
            toast.error("Something went wrong".toUpperCase())

        }

    }
    return (
        <Layout>
            {doctor && <div>
                <h1 className="page-title">{doctor.firstName} {doctor.lastName}</h1>
                <hr />
                <Row className="mt-2">
                    <Col span={6} sm={24} lg={8}>
                        <h1 className="normal-text"><b>Timings</b> : {doctor.timeings[0]} - {doctor.timeings[1]}</h1>
                        <div className="d-flex flex-column">
                            <DatePicker format="DD-MM-YY" className="mt-3" onChange={(val) => setDate(moment(val).format("DD-mm-YYYY"))} />
                            <TimePicker.RangePicker format="HH:mm" className="mt-3" onChange={(vals) => setSelectedTimeing([
                                moment(vals[0]).format("HH:mm"),
                                moment(vals[1]).format("HH:mm"),
                            ])} />
                        </div>
                        <Button className="primary-button mt-4" onClick={checkAvailiblityNow}>Check Availbility</Button>
                        <Button className="primary-button mt-4" onClick={bookNow} >Book Now</Button>
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}
export default BookAppoenment