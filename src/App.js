
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import './App.css';
import Feed from './components/Feedpage/Feed';
import Login from './components/Login&Signup/Login';
import Signup from './components/Login&Signup/Signup';

function PrivateRoute(props) {
  const authenticatedtoken = localStorage.getItem("isSignin");
return authenticatedtoken? <Route {...props} ></Route> : <Redirect to="/login"></Redirect>
}

function App() {
  return (
    <Router>
      <Switch>
       <Route path="/login" component={Login} />
       <Route path="/signup" component={Signup} />
       <PrivateRoute exact path="/" component={Feed} />
    
      </Switch>
    </Router>
       
  );
}

export default App;
