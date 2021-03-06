import "./App.css";
import Nav from "./components/pages/Nav";
import Main from "./components/pages/Main";
import SignUp from "./components/pages/signup";
import SignIn from "./components/pages/signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          {<Route exact path="/SignIn" component={SignIn} />}
          <Route exact path="/SignUp" component={SignUp} />
          {/* <Route exact path="/Profile" component={} /> */}
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
