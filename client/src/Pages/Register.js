import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

function Register() {
    const onFinished = (values) => {
        console.log(values)
    }

    return (
        <div className="authentication">
            <div className="authentication-form card p-2">
                <h1 className="card-title">Nice To Meet U!</h1>
                <Form layout='vertical' onFinish={onFinished}>
                    <Form.Item label='Name' name='name'>
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email' type="email" />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='Password' type="password" />
                    </Form.Item>
                    <Button className='primary-button' htmlType='submit'>Register</Button>
                    <Link to="/login" className='anchor mt-3'>CLICK HERE TO LOGIN</Link>
                </Form>
            </div>
        </div>
    )
}
export default Register