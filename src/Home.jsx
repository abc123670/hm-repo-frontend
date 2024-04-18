import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
    const [patientCount, setPatientCount] = useState()
    const [doctorCount, setDoctorCount] = useState()
    const [appointmentCount, setAppointmentCount] = useState()
 
    useEffect(() => {
        axios.get('http://localhost:8081/patientCount')
            .then(res => {
                setPatientCount(res.data[0].patient)
            }).catch(err => console.log(err));

        axios.get('http://localhost:8081/doctorCount')
            .then(res => {
                setDoctorCount(res.data[0].doctor)
            }).catch(err => console.log(err));
            
        axios.get('http://localhost:8081/appointmentCount')
            .then(res => {
                setAppointmentCount(res.data[0].appointment)
            }).catch(err => console.log(err));
    }, [])

    return (
        <div>
            <section className="key-features">
                <div className="row">
                    <div className="col-lg-4 kvxol col-md-12" align="center">
                        <div className="single-key ky-1">
                            <h5>Doctor</h5>
                            <Link to="/manageDoctor">
                                <img style={{ width: "50%" }} src="doctor.jpg" className='border' />
                            </Link>
                            <div>
                                <h4 className=' text-black'>Total: {doctorCount}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 kvxol col-md-12" align="center">
                        <div className="single-key ky-1">
                            <h5>Patient</h5>
                            <Link to="/managePatient">
                                <img style={{ width: "50%" }} src="patient.png" className='border' />
                            </Link>
                            <div>
                                <h4 className=' text-black'>Total: {patientCount}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 kvxol col-md-12" align="center">
                        <div className="single-key ky-2">
                            <h5>Appointment</h5>
                            <Link to="/manageAppointment">
                                <img style={{ width: "50%" }} src="appoint.jpg" className='border' />
                            </Link>
                            <div>
                                <h4 className=' text-black'>Total: {appointmentCount}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home