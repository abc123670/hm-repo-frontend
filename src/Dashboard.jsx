import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
  
function Dashboard() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/home")
      .then((result) => {
        console.log(result);
        if (result.data && result.data.Status === "Success") {
          if (result.data.role === "admin") {
            navigate("/");
          } else {
            navigate("/UserIndex");
          }
        } else {
          navigate("/start");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
        <div className="row">
          <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5" style={{ zIndex: '9' }}>
          <nav className="navbar navbar-expand-lg bg-primary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <Link to="" className="navbar-brand">
              <h4 className="text-uppercase mb-1"  style={{color:"orange"}}>Hospital Management System</h4>
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
              <div className="navbar-nav ml-auto py-0">
                <Link to="/" className="nav-item nav-link active">Home</Link>
                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Patients</Link>
                  <div className="dropdown-menu rounded-0 m-0">
                    <Link to="/addPatient" className="dropdown-item">Add</Link>
                    <Link to="/managePatient" className="dropdown-item">Manage</Link>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Doctors</Link>
                  <div className="dropdown-menu rounded-0 m-0">
                    <Link to="/addDoctor" className="dropdown-item">Add</Link>
                    <Link to="/manageDoctor" className="dropdown-item">Manage</Link>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Appointment</Link>
                  <div className="dropdown-menu rounded-0 m-0">
                    <Link to="/addAppointment" className="dropdown-item">Add</Link>
                    <Link to="/manageAppointment" className="dropdown-item">Manage</Link>
                  </div>
                </div>
                <li>
                  <Link to="/changePassword" className="nav-item nav-link"><i className='fa fa-lock'></i> ChangePassword</Link>
                </li>
                <li onClick={handleLogout}>
                  <Link to="" className="nav-item nav-link">Logout</Link>
                </li>
              </div>
            </div>
          </nav>
        </div>
      </div><br />
    <br />
    <Outlet />
    </div>
  )
}

export default Dashboard