import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  const [userValues, setUserValues] = useState({
    email: '', password: '',
  });

  const onChange = e => setUserValues({ ...userValues, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    alert(JSON.stringify(userValues))
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-6">
        <h2 className="text-center mb-5">Sign In</h2>
        <form className="needs-validation" onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={onChange}
              value={userValues.email}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={onChange}
              value={userValues.password}
            />
          </div>

          <div className="d-grid">
            <Link className="text-center mb-3" to="/sign-up">Need an account?</Link>
            <button
              className="btn btn-primary"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
