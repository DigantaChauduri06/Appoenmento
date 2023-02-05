import { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'
import { Col, Row } from 'antd'
import Doctor from '../Components/Doctor'
import { hideLoading, showLoading } from '../Redux/slice/alertsSlice'
import { useDispatch } from 'react-redux';

function Home() {
    const [doctor, setDoctor] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getData = async () => {
            try {
                dispatch(showLoading())

                // axios.post(url, payload, headers)
                const res = await axios.get("/api/user/get-all-approved-doctors", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                dispatch(hideLoading())
                if (res.data.success) {
                    setDoctor(res.data.data)
                }
            } catch (err) {
                dispatch(hideLoading())
                console.error("Error fetching", err)
            }
        }
        getData()
    }, [])

    return (
        <Layout>
            <h1>Home Page</h1>
            <Row gutter={20}>
                {
                    doctor?.map((man) => (
                        <Col span={8} xs={24} sm={24} lg={8}>
                            <Doctor doctor={man} key={Math.random() * 200000} />
                        </Col>
                    ))
                }
            </Row>
        </Layout>
    )
}
export default Home