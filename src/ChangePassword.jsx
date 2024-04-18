import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const changePassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Make a PUT request to your changePassword endpoint
    axios
      .put(
        "http://localhost:8081/changePassword",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (
          response.status === 200 &&
          response.data.message === "Password changed successfully"
        ) {
          alert("Password changed successfully!");
          navigate("/start");
        } else {
          alert("An error occurred during password change.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Change Password</h2>
      <br />
      <form className="row g-3 w-50 container border" onSubmit={changePassword}>
        <div className="col-12">
          <label htmlFor="inputName4" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputName4"
            required
            placeholder="Enter Current Password"
            autoComplete="off"
            name="currentPassword"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputSalary" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputSalary"
            required
            placeholder="Enter New Password"
            autoComplete="off"
            name="newPassword"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputAddress"
            required
            placeholder="Enter Confirm Password"
            autoComplete="off"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>
        <div className="col-12 p-2">
          <button className="btn btn-success" type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
