import Layout from '../../Components/Layout';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from "../../Redux/slice/alertsSlice";
import axios from 'axios'
import { Table } from 'antd';
import { toast } from 'react-hot-toast';

function DoctorList() {
    const [doctors, setDoctors] = useState([])
    const dispatch = useDispatch();
    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.get("/api/admin/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                // console.log(res.data.data);
                setDoctors(res.data.data)
            }
        } catch (e) {
            dispatch(hideLoading())
        }
    }
    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("/api/admin/change-doctor-status", { doctorId: record._id, userId: record.userId, status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                // console.log(res.data.data);
                toast.success(res.data?.message)
                getDoctorData()
            }
        } catch (e) {
            toast.error("SOMETHING WENT WRONG")
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        getDoctorData()
    }, [])
    const columns = [
        {
            key: '1',
            title: "Name",
            dataIndex: 'name',
            render: (text, record) => (
                <p className="card-text">{`${record.firstName} ${record.lastName}`}</p>
            )
        },
        {
            key: '2',
            title: "Phone",
            dataIndex: 'phoneNumber'
        },
        {
            key: '3',
            title: "Created At",
            dataIndex: 'createdAt'
        },
        {
            key: '3',
            title: "Status",
            dataIndex: 'status'
        },
        {
            key: '4',
            title: "Actions",
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex' key={Math.random() * 100000}>

                    {record.status.toLowerCase() === 'pending' && <h1 className='anchor' onClick={() => changeDoctorStatus(record, 'approved')}>Approve</h1>}
                    {record.status.toLowerCase() === 'approved' && <h1 onClick={() => changeDoctorStatus(record, 'blocked')} className='anchor' >Block</h1>}
                </div>
            )
        },
    ]
    return (
        <Layout>
            <h1 className="page-header">DoctorList</h1>
            <Table columns={columns} dataSource={doctors} key={Math.random() * 10000} />
        </Layout>
    )
}
export default DoctorList;