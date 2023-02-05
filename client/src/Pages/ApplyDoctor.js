import Layout from "../Components/Layout"
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { hideLoading, showLoading } from "../Redux/slice/alertsSlice";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import DoctorForm from '../Components/DoctorForm';
import dayjs from "dayjs";

export function getTimeing(time) {
    time = time.toString()
    console.log(time);
    const timeArr = time.split(":");
    let str = ""
    str += timeArr[0][timeArr[0].length - 2] + timeArr[0][timeArr[0].length - 1] + ":"
    str += timeArr[1]
    return str
}

function ApplyDoctor() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            values.email = values.email?.toLowerCase()
            const res = await axios.post("/api/user/apply-doctor", {
                ...values, userId: user._id,
                timeings: [
                    getTimeing(values.timeings[0].$d),
                    getTimeing(values.timeings[1].$d),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/")
            } else {
                dispatch(hideLoading())
                toast.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading())
            console.error("ERROR FROM REGISTER ", e)
            const response = e.response?.data?.message || "SOMETHING WENT WRONG"
            toast.error(response)
        }
    }
    return (
        <Layout>
            <h1 className="page-title">Apply Doctor</h1>
            <hr />
            <DoctorForm onFinish={onFinish} />
        </Layout>
    )
}
export default ApplyDoctor