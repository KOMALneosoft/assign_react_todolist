import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';

import Addtask from './components/Addtask';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/registration" exact component={Registration}/>

        <Route path="/addtask" exact component={Addtask}/>
       
      </Switch>
    </Router>

   
    </>
  );
}

export default App;
