"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";

function UserList() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const userData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/");
      setData(response.data.users);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleDelete = async (email) => {
    const inputEmail = window.prompt("Please enter email to delete");
    if (inputEmail === email) {
      try {
        await axios.delete(`http://localhost:3000/user/delete/${email}`);
        setData(data.filter((user) => user.email !== email));
      } catch (error) {
        console.log(
          "Error deleting user:",
          error.response?.data || error.message
        );
      }
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <div className="container py-4">
      
      <div className="card shadow-lg p-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-primary">
                First Name
              </th>
              <th scope="col" className="text-primary">
                Last Name
              </th>
              <th scope="col" className="text-primary">
                Email
              </th>
              <th scope="col" className="text-primary text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                  <td className="text-center">
                    <Link
                      href={`/pages/edit?fname=${encodeURIComponent(
                        item.fname
                      )}&lname=${encodeURIComponent(
                        item.lname
                      )}&email=${encodeURIComponent(item.email)}`}
                    >
                      <button className="btn btn-warning btn-sm me-2">
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(item.email)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Data is not loaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-center">
          <Link href="/pages/create" passHref>
            <button type="button" className="btn btn-primary">
              <i className="bi bi-person-plus"></i> Add User
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserList;
