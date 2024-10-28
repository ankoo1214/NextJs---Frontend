"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
function UserList() {
  const [data, setData] = useState([]);

  const userData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/");
      setData(response.data.users);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <div className="container">
        <table className="table">
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
            </tr>
          </thead>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tbody>
                <tr>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.email}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <p>Data is not loaded</p>
          )}
        </table>
        <Link href={"/Create"} passHref>
          <button type="button" class="btn btn-primary">
            Add user
          </button>
        </Link>
      </div>
    </>
  );
}

export default UserList;
