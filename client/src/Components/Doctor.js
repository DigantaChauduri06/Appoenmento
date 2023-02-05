
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Doctor({ doctor }) {
    const navigate = useNavigate()
    return (
        <div className='card p-4 rounded' style={{ cursor: "pointer" }} onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
            <h1 className="card-title">{doctor.firstName} {doctor.lastName}</h1>
            <hr />
            <p className='card-text'><b>Phone Number : </b> {doctor.phoneNumber} </p>
            <p className='card-text'><b>Address : </b> {doctor.address} </p>
            <p className='card-text'><b>Fee per visit : </b> {doctor.feePerConsultation} </p>
            <p className='card-text'><b>Timings : </b> {doctor.timeings[0]} - {doctor.timeings[1]} </p>
        </div>
    )
}
export default Doctor