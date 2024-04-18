import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPatient() {
  const [patient, setPatient] = useState({
    name: '',
    gender: '',
    contact: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/createPatient', patient)
      .then(result => {
        alert("Patient Added Successfull")
        navigate('/managePatient');
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Patient</h2>
      <br />
      <form className="row g-3 w-50 container border" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName4" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName4"
            required
            placeholder="Enter Patient Name"
            autoComplete="off"
            name='name'
            value={patient.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Contact
          </label>
          <input
            type="number"
            className="form-control"
            id="inputSalary"
            required
            placeholder="Enter Contact"
            autoComplete="off"
            name='contact'
            value={patient.contact}
            onChange={handleInputChange}
          />
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
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            required
            placeholder="Enter Address"
            autoComplete="off"
            name='address'
            value={patient.address}
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

export default AddPatient;
