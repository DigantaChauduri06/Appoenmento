import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/alertsSlice';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinished = async (values) => {
        dispatch(showLoading())
        console.log(values)
        try {
            values.email = values.email?.toLowerCase()
            const res = await axios.post("/api/user/login", values)
            dispatch(hideLoading())
            if (res.data.success) {
                toast.success(res.data.message)
                toast.success("Redirected to Home Page")
                localStorage.setItem("token", res.data.data)
                navigate("/")
            } else {
                dispatch(hideLoading())
                toast.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading())
            console.error("ERROR FROM LOGIM ", e)
            const response = e.response?.data?.message || "SOMETHING WENT WRONG"
            toast.error(response)
        }
    }

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Welcome Back!</h1>
                <Form layout='vertical' onFinish={onFinished}>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' type="email" required />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='Password' type="password" required />
                    </Form.Item>
                    <Button className='primary-button' htmlType='submit'>Login</Button>
                    <Link to="/register" className='anchor mt-3'>CLICK HERE TO Register</Link>
                </Form>
            </div>
        </div>
    )
}
export default Login