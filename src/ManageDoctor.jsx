import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ManageDoctor() {
  const [showPassword, setShowPassword] = useState({});
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    fetchDoctor();
  }, []);
  
  const fetchDoctor = () => {
    axios
      .get('http://localhost:8081/view_Doctor')
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Doctor ?"
    );
    if (confirmed) {
      axios
        .delete(`http://localhost:8081/deleteDoctor/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setDoctor(doctor.filter((doctor) => doctor._id !== id));
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
    <h3>Doctor List</h3>
  </div>
  <table className='table table-striped table-hover text-center'>
    <thead className='table-dark'>
      <tr>
        <th>Name</th>
        <th>Contact</th>
        <th>Special</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {doctor.map((doctor, index) => (
          <tr key={doctor.id}>
            <td>{doctor.name}</td>
            <td>
            {showPassword[doctor._id] ? doctor.contact : "********"}
              <FontAwesomeIcon
                icon={showPassword[doctor._id] ? faEyeSlash : faEye}
                className="field-icon toggle-password-2 btn btn-primary"
                onClick={() => togglePasswordVisibility(doctor._id)}
              />
            </td>
            <td>{doctor.special}</td>
            <td>
            <div className="action-buttons">
              <Link to={`/doctorEdit/${doctor._id}`} className='btn btn-primary'>Update</Link>
              <span style={{ marginLeft: '10px' }}></span>
              <button onClick={() => handleDelete(doctor._id)} className='btn btn-danger'>Delete</button>
            </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

  );
}

export default ManageDoctor;
