import { useEffect } from 'react'
import axios from 'axios'
import Layout from '../Components/Layout'

function Home() {
    useEffect(() => {
        const getData = async () => {
            try {
                // axios.post(url, payload, headers)
                const res = await axios.post("/api/user/get-user-info-by-id", {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
            } catch (err) {

            }
        }
        getData()
    }, [])

    return (
        <Layout>
            <h1>HomePage</h1>
        </Layout>
    )
}
export default Home