
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "next/navigation";

function EditUser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const fname = searchParams.get("fname");
  const lname = searchParams.get("lname");

  const [userData, setUserData] = useState({ fname: "", lname: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (fname && lname && email) {
      setUserData({ fname, lname, email });
    }
  }, [fname, lname, email]);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    console.log("Updating user with data:", userData);
    const response = await axios.put(
      `http://localhost:3000/user/update/${email}`,
      userData
    );
    setSuccess("User updated successfully!");
  } catch (error) {
    console.log("Error updating user:", error.response?.data || error.message);
    setError("Failed to update user.");
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 w-100 ">
      <div className="card p-5 shadow-lg w-50">
        <h2 className="text-primary text-center mb-4">Edit User</h2>
        {error && <div className="text-danger">{error}</div>}
        {success && <div className="text-success">{success}</div>}
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              value={userData.fname}
              onChange={(e) =>
                setUserData({ ...userData, fname: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              value={userData.lname}
              className="form-control"
              onChange={(e) =>
                setUserData({ ...userData, lname: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={userData.email}
              type="email"
              className="form-control"
              readOnly
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="my-2">
            <button type="submit" className="btn btn-primary w-100">
              Update User
            </button>
          </div>
          <Link href="/" passHref>
            <button
              type="button"
              className="btn btn-outline-primary w-100 mt-2"
            >
              Back to user list
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditUser;

