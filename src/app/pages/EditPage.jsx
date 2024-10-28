import { useLocation } from "react-router";
import { Link } from "react-router-dom";
function EditPage() {
  const location = useLocation();
  const { user } = location.state || {};
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center  min-vh-100">
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h6 className="text-secondary">First Name</h6>
            <h5 class="card-title">{user.fname}</h5>
            <h6 className="text-secondary">Last Name</h6>
            <h5 className="card-title"> {user.lname}</h5>
            <h6 className="text-secondary">Email</h6>
            <h5 className="card-title">{user.email}</h5>
            <div className="d-flex justify-content-between">
              <Link to={"/"}>
                <button className="btn btn-primary">Edit</button>
              </Link>
              <Link to={"/"}>
                <button className="btn btn-primary">Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditPage;
