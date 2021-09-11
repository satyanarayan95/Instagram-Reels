
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import './App.css';
import Feed from './components/Feedpage/Feed';
import Login from './components/Login&Signup/Login';
import Signup from './components/Login&Signup/Signup';
import Profile from "./components/Profile/Profile";

function PrivateRoute(props) {
  const authenticatedtoken = localStorage.getItem("isSignin");
return authenticatedtoken? <Route {...props} ></Route> : <Redirect to="/login"></Redirect>
}


function App() {
  return (
    <>
      <Router>
      <Switch>
       <Route exact path="/login" component={Login} />
       <Route exact path="/signup" component={Signup} />
       <PrivateRoute exact path="/" component={Feed} />
       <PrivateRoute exact path="/profile" component={Profile} />
    
      </Switch>
    </Router>
    </>
       
  );
}

export default App;
