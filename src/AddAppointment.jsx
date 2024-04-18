import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddAppointment() {
  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
  });

  const [myDoctors, setMyDoctors] = useState([]);
  const [myPatients, setMyPatients] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/createAppointment", appointment)
      .then((result) => {
        alert("Appointment Added Successfull");
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
      <h2>Add Appointment</h2>
      <br />
      <form className="row g-3 w-50 container border" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputDoctor" className="form-label">
            Doctor Name:
          </label>
          <select
            required
            className="form-control"
            id="inputDoctor"
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleInputChange}
          >
            <option value="">Select Doctor</option>
            {myDoctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="inputPatient" className="form-label">
            Patient Name:
          </label>
          <select
            required
            className="form-control"
            id="inputPatient"
            name="patientId"
            value={appointment.patientId}
            onChange={handleInputChange}
          >
            <option value="">Select Patient</option>
            {myPatients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="inputDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            required
            autoComplete="off"
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputTime" className="form-label">
            Time
          </label>
          <input
            type="time"
            className="form-control"
            id="inputTime"
            required
            autoComplete="off"
            name="time"
            value={appointment.time}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12 p-2">
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAppointment;
