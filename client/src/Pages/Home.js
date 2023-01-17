import { useEffect } from 'react'
import axios from 'axios'

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

                console.log(res.data);
            } catch (err) {

            }
        }
        getData()
    }, [])

    return (
        <div>Home</div>
    )
}
export default Home