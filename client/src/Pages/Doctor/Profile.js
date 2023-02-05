import Layout from '../../Components/Layout';
import DoctorForm from '../../Components/DoctorForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/slice/alertsSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { getTimeing } from '../ApplyDoctor';

function Profile() {
    const [doctor, setDoctor] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const params = useParams()

    async function getDoctorData() {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/doctor/get-doctor-info-by-id", { userId: params.doctorId }, {
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



    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            values.email = values.email?.toLowerCase()
            const res = await axios.post("/api/doctor/update-doctor-info-by-id", {
                ...values, userId: user._id,
                timeings: [
                    getTimeing(values.timeings[0]),
                    getTimeing(values.timeings[1]),
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
            <h1 className='page-title'>Doctor Profile</h1>
            <hr />
            {
                doctor && <DoctorForm onFinish={onFinish} initialValue={doctor} />
            }

        </Layout>
    )
}
export default Profile