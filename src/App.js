import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContext } from './context/authContext';

import Loader from './components/Loader';
import Navbar from './components/Navbar';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const { loading } = useContext(AuthContext)

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <h1>Home</h1>
          </Route>
          <Route path="/sign-up" exact>
            <SignUpPage />
          </Route>
          <Route path="/sign-in" exact>
            <SignInPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
