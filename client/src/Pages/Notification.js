import { Tabs } from 'antd';
import Layout from '../Components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hideLoading, showLoading } from '../Redux/slice/alertsSlice';
import { toast } from 'react-hot-toast';
import { setUser } from '../Redux/slice/userSlice';
import { useEffect } from 'react';
import proxyApi from '../proxy';


function Notification() {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const markAllSeen = async () => {
        try {
            dispatch(showLoading())
            const res = await proxyApi.post("/api/user/mark-all-notification-seen", { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())

            if (res.data.success) {
                dispatch(setUser(res.data.data))
                toast.success(res.data.message)
            } else {
                dispatch(hideLoading())
                toast.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading())
            console.error("ERROR FROM NOTIFICATION ", e)
            const response = e.response?.data?.message || "SOMETHING WENT WRONG"
            toast.error(response)
        }
    }
    const deleteAllSeen = async () => {
        try {
            dispatch(showLoading())
            const res = await proxyApi.post("/api/user/delete-all-notification-seen", { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())

            if (res.data.success) {
                dispatch(setUser(res.data.data))
                toast.success(res.data.message)
            } else {
                dispatch(hideLoading())
                toast.error(res.data.message)
            }
        } catch (e) {
            dispatch(hideLoading())
            console.error("ERROR FROM NOTIFICATION ", e)
            const response = e.response?.data?.message || "SOMETHING WENT WRONG"
            toast.error(response)
        }
    }

    return (
        <Layout>
            <h1 className='page-title'>Notification</h1>
            <Tabs>
                <Tabs.TabPane tab='Unseen' key={0}>
                    <div className="d-flex justify-content-end">
                        <h2 className="anchor" style={{ cursor: "pointer" }} onClick={markAllSeen}>Mark all as seen</h2>
                    </div>
                    {
                        user?.unseenNotification.map(noti => (
                            <div className='card p-2 m-2 mb-3' style={{ cursor: "pointer" }} key={noti.data?.doctorId} onClick={() => navigate(noti.onClickPath)}>
                                <div className="card-text">{noti.message}</div>
                            </div>
                        )

                        )
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Seen' key={1}>
                    <div className="d-flex justify-content-end">
                        <h2 className="anchor" style={{ cursor: "pointer" }}
                            onClick={deleteAllSeen}>Delete All</h2>
                    </div>
                    {
                        user?.seenNotification.map(noti => (
                            <div className='card p-2 m-2 mb-3' style={{ cursor: "pointer" }} key={noti.data?.doctorId} onClick={() => navigate(noti?.onClickPath)}>
                                <div className="card-text">{noti?.message}</div>
                            </div>
                        )

                        )
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}
export default Notification