import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { hideLoading, showLoading } from '../Redux/slice/alertsSlice'
import { useDispatch } from 'react-redux';

function Register() {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const onFinished = async (values) => {
        try {
            dispatch(showLoading())
            values.email = values.email?.toLowerCase()
            const res = await axios.post("/api/user/register", values)
            dispatch(hideLoading())

            if (res.data.success) {
                toast.success(res.data.message)
                toast.success("Redirected to login")
                navigate("/login")
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
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Nice To Meet U!</h1>
                <Form layout='vertical' onFinish={onFinished}>
                    <Form.Item required label='Name' name='name'>
                        <Input placeholder='Name' required />
                    </Form.Item>
                    <Form.Item required label='Email' name='email'>
                        <Input placeholder='Email' type="email" required />
                    </Form.Item>
                    <Form.Item required label='Password' name='password'>
                        <Input placeholder='Password' type="password" required />
                    </Form.Item>
                    <Button className='primary-button' htmlType='submit'>Register</Button>
                    <Link to="/login" className='anchor mt-3'>CLICK HERE TO LOGIN</Link>
                </Form>
            </div>
        </div>
    )
}
export default Register