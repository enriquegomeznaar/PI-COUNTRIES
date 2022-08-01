import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing";
import Home from "./components/home";
import Form from "./components/form";
import Detail from "./components/detail";

function App() {
  return (
    <div className="div-contenedor">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/form" component={Form} />
            <Route path="/detail" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
