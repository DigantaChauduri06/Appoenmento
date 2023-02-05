import { Button, Col, Form, Input, Row, TimePicker } from "antd"
// import moment from 'moment' 
import dayjs from 'dayjs'
import { getTimeing } from '../Pages/ApplyDoctor';

function DoctorForm({ onFinish, initialValue }) {
    const myInitialValue = initialValue !== undefined ? {
        ...initialValue, timeings: [
            dayjs(initialValue.timeings[0], 'HH:mm'),
            dayjs(initialValue.timeings[1], 'HH:mm'),
        ]
    } : null
    console.log(initialValue);
    return (
        <Form layout="vertical" onFinish={onFinish} initialValues={myInitialValue}>
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
                        <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <Button htmlType="submit" className="primary-button" style={{ width: "150px" }}>SUBMIT</Button>
            </div>
        </Form>
    )
}
export default DoctorForm