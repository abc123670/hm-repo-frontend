import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import ManageDoctor from './ManageDoctor'
import Home from './Home'
import AddDoctor from './AddDoctor'
import DoctorEdit from './DoctorEdit'
import Start from './Start'
import AddPatient from './AddPatient'
import PatientEdit from './PatientEdit'
import ManagePatient from './ManagePatient'
import AddAppointment from './AddAppointment'
import ManageAppointment from './ManageAppointment'
import AppointmentEdit from './AppointmentEdit'
import ChangePassword from './ChangePassword'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/manageDoctor' element={<ManageDoctor />}></Route>
        <Route path='/managePatient' element={<ManagePatient />}></Route>
        <Route path='/manageAppointment' element={<ManageAppointment />}></Route>
        <Route path='/addDoctor' element={<AddDoctor />}></Route>
        <Route path='/addPatient' element={<AddPatient />}></Route>
        <Route path='/addAppointment' element={<AddAppointment />}></Route>
        <Route path='/doctorEdit/:id' element={<DoctorEdit />}></Route>
        <Route path='/patientEdit/:id' element={<PatientEdit />}></Route>
        <Route path='/appointmentEdit/:id' element={<AppointmentEdit />}></Route>
        <Route path='/changePassword' element={<ChangePassword />}></Route>
      </Route>
      <Route path='/start' element={<Start />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App