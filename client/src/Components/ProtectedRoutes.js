import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { setUser } from '../Redux/slice/userSlice';
import { hideLoading, showLoading } from '../Redux/slice/alertsSlice'


function ProtectedRoutes({ children }) {
    const { user, reloadUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigete = useNavigate()
    async function getUser() {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/user/get-user-info-by-id", { token: localStorage.getItem("item") }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(setUser(res.data.data))
                dispatch(hideLoading())
            } else {
                dispatch(hideLoading())
                localStorage.clear()
                navigete("/login")
            }
        } catch (e) {
            dispatch(hideLoading())
            localStorage.clear()
            navigete("/login")

        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user])

    if (localStorage.getItem('token')) {
        return (
            children
        )
    }
    else {
        return <Navigate to="/login" />
    }
}
export default ProtectedRoutes