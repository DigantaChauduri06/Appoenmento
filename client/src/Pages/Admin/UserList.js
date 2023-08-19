import Layout from '../../Components/Layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../../Redux/slice/alertsSlice";
import axios from 'axios'
import { Table } from 'antd';
import proxyApi from '../../proxy';

function UserList() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();
    const getUserData = async () => {
        try {
            dispatch(showLoading())
            const res = await proxyApi.get("/api/admin/get-all-users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                console.log(res.data.data);
                setUsers(res.data.data)
            }
        } catch (e) {
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    const columns = [
        {
            key: '1',
            title: "Name",
            dataIndex: 'name'
        },
        {
            key: '2',
            title: "Email",
            dataIndex: 'email'
        },
        {
            key: '3',
            title: "Created At",
            dataIndex: 'createdAt'
        },
        {
            key: '4',
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex' key={Math.random() * 100000}>
                    <h1 className='anchor'>Block</h1>
                </div>
            )
        },
    ]
    return (
        <Layout>
            <h1 className="page-header">Users</h1>
            <Table columns={columns} dataSource={users} key={Math.random() * 10000} />
        </Layout>
    )
}
export default UserList;