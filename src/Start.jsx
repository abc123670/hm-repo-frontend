import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Start() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8081/login', { email, password })
      .then((response) => {
        const { data } = response;
        if (data.message === 'Login successful') {
          navigate('/');
          alert('Login Successful');
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Invalid email or password');
      });
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
                <div className="position-relative px-lg-5" style={{ zIndex: '10' }}>
                    <nav className="navbar navbar-expand-lg bg-primary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
                        <a href="" className="navbar-brand">
                            <h1 className="text-uppercase mb-1" style={{color:"orange"}}>Hospital Management System</h1>
                        </a>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </nav>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img  style={{ height: '800px',width:'100%' }} src="img/carousel-1.jpg" alt="Image" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-5 border" >
                                    <h2 className='text-white'>Admin Login</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-4 text-left'>
                                            <label htmlFor='email' className='text-white'><strong>Email</strong></label>
                                            <input type='email' placeholder='Enter Email' name='email' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} className='form-control rounded-0' required />
                                        </div>
                                        <div className='mb-3 text-left'>
                                            <label htmlFor='password' className='text-white'><strong>Password</strong></label>
                                            <input type='password' placeholder='Enter Password' name='password' 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0' required />
                                        </div>
                                        <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
                                        <br /><p>You are agree to our terms and appointment</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img  style={{ height: '800px',width:'100%' }} src="img/carousel-2.jpg" alt="Image" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-5 border" >
                                    <h2 className='text-white'>Admin Login</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-4 text-left'>
                                            <label htmlFor='email' className='text-white'><strong>Email</strong></label>
                                            <input type='email' placeholder='Enter Email' name='email' 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} className='form-control black-border rounded-0' required />
                                        </div>
                                        <div className='mb-3 text-left'>
                                            <label htmlFor='password' className='text-white'><strong>Password</strong></label>
                                            <input type='password' placeholder='Enter Password' name='password' 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} className='form-control rounded-0' required />
                                        </div>
                                        <button type='submit' className='btn btn-success w-100 rounded-0'>Log In</button>
                                        <br /><p>You are agree to aour terms and appointment</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                        <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                            <span className="carousel-control-prev-icon mb-n2"></span>
                        </div>
                    </a>
                    <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                        <div className="btn btn-dark" style={{ width: '45px', height: '45px' }}>
                            <span className="carousel-control-next-icon mb-n2"></span>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Start