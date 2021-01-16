import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'bootstrap'

export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const collapse = new Collapse(document.getElementById('collapseTarget'), { toggle: false })
    toggle ? collapse.show() : collapse.hide()
  }, [toggle]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Odinblog</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setToggle(toggle => !toggle)}
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapseTarget">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-primary" to="/sign-in">Sign in</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary" to="/sign-up">Get started</Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
