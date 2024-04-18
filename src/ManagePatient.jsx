import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ManagePatient() {
  const [showPassword, setShowPassword] = useState({});
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    fetchPatient();
  }, []);
  
  const fetchPatient = () => {
    axios
      .get('http://localhost:8081/view_Patient')
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Patient ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deletePatient/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setPatient(patient.filter((patient) => patient._id !== id));
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className='px-5 pt-3'>
  <div className='d-flex justify-content-center'>
    <h3>Patient List</h3>
  </div>
  <table className='table table-striped table-hover text-center'>
    <thead className='table-dark'>
      <tr>
        <th>Name</th>
        <th>Contact</th>
        <th>Gender</th>
        <th>Address</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {patient.map((patient, index) => (
         <tr key={patient.id}>
            <td>{patient.name}</td>
            <td>
              {showPassword[patient._id] ? patient.contact : "********"}
              <FontAwesomeIcon
                icon={showPassword[patient._id] ? faEyeSlash : faEye}
                className="field-icon toggle-password-2 btn btn-primary"
                onClick={() => togglePasswordVisibility(patient._id)}
              />
            </td>
            <td>{patient.gender}</td>
            <td>{patient.address}</td>
            <td>
            <div className="action-buttons">
              <Link to={`/patientEdit/${patient._id}`} className='btn btn-primary'>Update</Link>
              <span style={{ marginLeft: '10px' }}></span>
              <Link onClick={() => handleDelete(patient._id)} className='btn btn-danger'>Delete</Link>
            </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

  );
}

export default ManagePatient;
