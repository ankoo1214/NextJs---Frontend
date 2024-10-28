import { useState } from "react";
import axios from "axios";


function Create() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUserSignUp = () => {
    if (!fname || !lname || !email) {
      setError("All fields are required!");
      return; // Stop the function if validation fails
    }

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);

    axios
      .post("http://localhost:5000/user/register",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.Status === "user is created") {
          console.log("User is created");
          setError("");
          setfname("");
          setlname("");
          setemail("");
          setSuccess("User is created");
      
        } else {
          setError(response.data.Status || "Unknown error occurred");
        }
      })
      .catch((error) => {
   
        if (error.response && error.response.data) {
          console.log(error.response.data);
          setError(error.response.data.message || "Error creating the user");
        } else {
          console.log("Error creating the user", error);
          setError("Error creating the user");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="container-fluid w-50">
        <div className="text-primary fs-3 my-2">Create User</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              value={lname}
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setlname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              value={email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setemail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          {error && <label className="text-danger">{error}</label>}
          {success && <div className="text-success">{success}</div>}
          <div className="my-2">
          
            <button onClick={handleUserSignUp} className="btn btn-primary w-100 ">
              Create user
            </button>
          </div>

       
            <button className="btn btn-primary w-100">Back</button>
         
        </form>
      </div>
    </div>
  );
}

export default Create;
