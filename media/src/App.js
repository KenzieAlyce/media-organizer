
import './App.css'; 
import Nav from './components/pages/Nav';
import Main from './components/pages/Main';
import SignUp from './components/pages/signup';
import SignIn from './components/pages/signin';
import library from './components/pages/library';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
//import Avatar from '@material-ui/core/Avatar';
function App() {
  return (
    <>
    <Router>
      <Nav />
      <Switch>
     <Route exact path="/SignIn" component={SignIn}/>
    <Route exact path="/SignUp" component={SignUp}/>
    <Route  path="/" component={Main}/>
    <Route exact path="/library" component={library}/>
    </Switch>
    </Router>
  </>
  );
}

export default App;
