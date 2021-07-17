import "./App.scss";
import Transactions from "./transaction/Transactions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {


  return <Router>
    <Switch>
      <Route path={"/customers"}>
        Customers
      </Route>
      <Route path={"/"}>
        <Transactions />
      </Route>
    </Switch>
  </Router>;
}

export default App;
