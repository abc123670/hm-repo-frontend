import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
  const [doctor, setDoctor] = useState({
    name: '',
    special: '',
    contact: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/createDoctor', doctor)
      .then(result => {
        alert("Doctor Added Successfull")
        navigate('/manageDoctor');
      })
      .catch(err => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor(prevDoctor => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Doctor</h2>
      <br />
      <form className="row g-3 w-50 container border" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName4" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName4"
            name="name"
            required
            placeholder="Enter Name"
            autoComplete="off"
            value={doctor.name}
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
            name="contact"
            required
            placeholder="Enter Contact"
            autoComplete="off"
            value={doctor.contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Special
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="special"
            required
            placeholder="Enter Specialization"
            autoComplete="off"
            value={doctor.special}
            onChange={handleInputChange}
          />
        </div>&nbsp;&nbsp;
        <div className="col-12 p-2">
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
