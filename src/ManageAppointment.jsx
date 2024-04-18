import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function ManageAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8081/view_Appointment');
      setAppointments(response.data);
    } catch (err) {
      setError("Failed to retrieve appointment data");
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Appointment?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteAppointment/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setAppointments(appointments.filter((appointment) => appointment._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="px-5 pt-3">
      <div className="d-flex justify-content-center">
        <h3>Appointment List</h3>
      </div>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-striped table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>Doctor Name</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.doctorId.name}</td>
                <td>{appointment.patientId.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/appointmentEdit/${appointment._id}`} className="btn btn-primary">
                      Update
                    </Link><span style={{ marginLeft: '10px' }}></span>
                    <button onClick={() => handleDelete(appointment._id)} className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageAppointment;
