import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AppointmentEdit() {
  const [appointment, setAppointment] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    time: ""
  });
  const [myDoctors, setMyDoctors] = useState([]);
  const [myPatients, setMyPatients] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch appointment details
    axios
      .get(`http://localhost:8081/getAppointment/${id}`)
      .then((response) => {
        setAppointment(response.data.appointment);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch doctors and patients data
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8081/view_Doctor");
        if (Array.isArray(response.data)) {
          setMyDoctors(response.data);
        } else {
          setError("Failed to fetch doctors. Invalid response.");
        }
      } catch (error) {
        setError("Failed to fetch doctors.");
        console.log(error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8081/view_Patient");
        if (Array.isArray(response.data)) {
          setMyPatients(response.data);
        } else {
          setError("Failed to fetch patients. Invalid response.");
        }
      } catch (error) {
        setError("Failed to fetch patients.");
        console.log(error);
      }
    };

    fetchDoctors();
    fetchPatients();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updateAppointment/${id}`, appointment)
      .then((result) => {
        alert("Appointment Updated Successfully");
        navigate("/manageAppointment");
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Appointment</h2>
      <br />
      {error && <div>Error: {error}</div>}
      <form className="row g-3 w-50 border" onSubmit={handleSubmit}>
        {/* Doctor Select */}
        <div className="col-12">
          <label htmlFor="inputDoctor" className="form-label">
            Doctor Name:
          </label>
          <select
            className="form-control"
            id="inputDoctor"
            name="doctorId"
            value={appointment.doctorId.name}
            onChange={handleInputChange}
          >
            <option value="">Select Doctor</option>
            {myDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Patient Select */}
        <div className="col-12">
          <label htmlFor="inputPatient" className="form-label">
            Patient Name:
          </label>
          <select
            className="form-control"
            id="inputPatient"
            name="patientId"
            value={appointment.patientId.name}
            onChange={handleInputChange}
          >
            <option value="">Select Patient</option>
            {myPatients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date Input */}
        <div className="col-12">
          <label htmlFor="inputDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            required
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Time Input */}
        <div className="col-12">
          <label htmlFor="inputTime" className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="inputTime"
            required
            name="time"
            value={appointment.time}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="col-12 p-2">
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentEdit;
