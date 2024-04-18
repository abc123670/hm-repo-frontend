import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: '',
    gender: '',
    contact: '',
    address: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/getPatient/${id}`)
      .then((response) => {
        setPatient(response.data.patient);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updatePatient/${id}`, patient) // Use PUT method to update the Patient
      .then((result) => {
        alert('Patient Updated Successfully');
        navigate('/managePatient');
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false); // Add showPassword state variable

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Patient</h2>
      <br />
      <form className="row g-3 w-50 border" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName4" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName4"
            placeholder="Enter Name"
            autoComplete="off"
            name='name'
            value={patient.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputContact4" className="form-label">
            Contact
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="inputContact4"
              placeholder="Enter Contact"
              autoComplete="off"
              name="contact"
              value={patient.contact}
              onChange={handleInputChange}
              required
            />
            <span
              style={{ color: 'blue', cursor: 'pointer' }}
              className={`input-group-text toggle-password-2 ${
                showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'
              }`}
              onClick={togglePasswordVisibility}
            ></span>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="gender" className="form-label">
            Gender:
          </label>
          <select
            className="form-control"
            id="gender"
            name='gender'
            value={patient.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="inputAddress"
            rows="3"
            placeholder="Enter Address"
            name='address'
            value={patient.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientEdit;
