import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
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
