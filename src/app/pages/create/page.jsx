"use client";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

function Create() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUserSignUp = () => {
    if (!fname || !lname || !email) {
      setError("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);

    axios
      .post("http://localhost:3000/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.Status === "User is created") {
          setError("");
          setFname("");
          setLname("");
          setEmail("");
          setSuccess("User successfully created!");
        } else {
          setError(response.data.Status || "Unknown error occurred");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Error creating the user");
        } else {
          setError("Error creating the user");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg w-50">
        <h3 className="text-center text-primary mb-4">Create New User</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className="form-control"
              placeholder="Enter first name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className="form-control"
              placeholder="Enter last name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email address"
            />
            <div className="form-text">We'll never share your email.</div>
          </div>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}
          {success && (
            <div className="alert alert-success text-center">{success}</div>
          )}

          <button
            onClick={() => handleUserSignUp()}
            className="btn btn-primary w-100 mt-3"
          >
            Create User
          </button>
          <Link href="/" passHref>
            <button className="btn btn-outline-primary w-100 mt-3">
              Back to User List
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
