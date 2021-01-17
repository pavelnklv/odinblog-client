import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import emailValid from '../utils/emailValid';

export default function SignInPage() {
  const { signIn } = useContext(AuthContext);

  const [userValues, setUserValues] = useState({
    email: '', password: '',
  });
  const [errors, setErrors] = useState({
    email: null, password: null,
  })

  const onChange = e => setUserValues({ ...userValues, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault()
    
    setErrors({ email: null, password: null })
    if (!emailValid(userValues.email)) {
      setErrors({ ...errors, email: 'Please provide a valid email.'})
    }
    if (userValues.password.trim() === '') {
      setErrors({ ...errors, password: 'Please provide a password.'})
    }

    signIn(userValues)
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-6">
        <h2 className="text-center mb-5">Sign In</h2>
        <form className="needs-validation" onSubmit={onSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              type="email"
              name="email"
              onChange={onChange}
              value={userValues.email}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              type="password"
              name="password"
              onChange={onChange}
              value={userValues.password}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
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
