import { Avatar } from '@material-ui/core';
import './App.css';
import SignUp from './components/pages/signup';
import SignIn from './components/pages/sighin';
// import Header from './components/';
import Main from './components/pages/Main';
// import Footer from './components/';
import Nav from './components/pages/Nav';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Nav />
      {/* <Header /> */}
      <Switch>
      <Route exact path="/SignIn" component={SignIn}/>
      <Route exact path="/SignUp" component={SignUp}/>
      <Route  path="/" component={Main}/>
      </Switch>
     {/* <Footer /> */}
        </Router>
  </>
  );
}

export default App;
