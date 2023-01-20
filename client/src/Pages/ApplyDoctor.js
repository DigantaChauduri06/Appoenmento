import Layout from "../Components/Layout"
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { hideLoading, showLoading } from "../Redux/slice/alertsSlice";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function ApplyDoctor() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            values.email = values.email?.toLowerCase()
            const res = await axios.post("/api/user/apply-doctor", { ...values, userId: user._id }, {
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
            <Form layout="vertical" onFinish={onFinish}>
                <h2 className="card-title mt-3">Personal Information</h2>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="First Name" name='firstName' rules={[{ required: true }]}>
                            <Input placeholder="First Name"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Last Name" name='lastName' rules={[{ required: true }]}>
                            <Input placeholder="Last Name"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Phone Number" name='phoneNumber' rules={[{ required: true }]}>
                            <Input placeholder="Phone Number"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Website" name='website' rules={[{ required: true }]}>
                            <Input placeholder="Website"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Address" name='address' rules={[{ required: true }]}>
                            <Input placeholder="Address"></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <hr />
                <h2 className="card-title mt-3">Professional Information</h2>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Specialization" name='specialization' rules={[{ required: true }]}>
                            <Input placeholder="Specialization"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Experience" name='experience' rules={[{ required: true }]}>
                            <Input type="number" placeholder="Experience"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Fee Per Consultation" name='feePerConsultation' rules={[{ required: true }]}>
                            <Input type="number" placeholder="Fee Per Consultation"></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Timeings" name='timeings' rules={[{ required: true }]}>
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <Button htmlType="submit" className="primary-button" style={{ width: "150px" }}>SUBMIT</Button>
                </div>
            </Form>
        </Layout>
    )
}
export default ApplyDoctor