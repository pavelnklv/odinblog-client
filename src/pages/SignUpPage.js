import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', email: '', password: '', about: ''
  })


  const onChange = e => setNewUser({ ...newUser, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(newUser))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-6">
        <h2 className="text-center mb-5">Sign In</h2>
        <form className="needs-validation" onSubmit={onSubmit} autoComplete="off">
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-3 mb-lg-0">
              <label className="form-label" htmlFor="firstName">First name</label>
              <input
                className="form-control"
                type="text"
                name="firstName"
                onChange={onChange}
                value={newUser.firstName}
              />
            </div>
            <div className="col-12 col-lg-6">
              <label className="form-label" htmlFor="lastName">Last name</label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                onChange={onChange}
                value={newUser.lastName}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={onChange}
              value={newUser.email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={onChange}
              value={newUser.password}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="about">About</label>
            <textarea
              className="form-control"
              name="about"
              onChange={onChange}
            >
              {newUser.about}
            </textarea>
          </div>

          <div className="d-grid">
            <Link className="text-center mb-3" to="/sign-in">Have an account?</Link>
            <button
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
