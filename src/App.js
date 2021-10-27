import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import Registration1 from './components/Registration1';
import Login from './components/Login';

import Addtask from './components/Addtask';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/registration" exact component={Registration1}/>
        <Route path="/addtask" exact component={Addtask}/>
       </Switch>
    </Router>
   </>
  );
}

export default App;