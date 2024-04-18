import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [doctor, setDoctor] = useState({
    name: "",
    contact: "",
    special: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8081/getDoctor/${id}`)
      .then((response) => {
        setDoctor(response.data.doctor);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/updateDoctor/${id}`, doctor) // Use PUT method to update the Patient
      .then((result) => {
        alert("Doctor Updated Successfully");
        navigate("/manageDoctor");
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false); // Add showPassword state variable

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Doctor</h2>
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
            name="name"
            value={doctor.name}
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
              value={doctor.contact}
              onChange={handleInputChange}
              required
            />
            <span
              style={{ color: "blue", cursor: "pointer" }}
              className={`input-group-text toggle-password-2 ${
                showPassword ? "fa fa-eye-slash" : "fa fa-eye"
              }`}
              onClick={togglePasswordVisibility}
            ></span>
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            Special
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Specialization"
            autoComplete="off"
            name="special"
            value={doctor.special}
            onChange={handleInputChange}
            required
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

export default DoctorEdit;
