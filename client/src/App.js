import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing/landing";
import Home from "./components/home/home";
import Form from "./components/form/form";
import Detail from "./components/detail/detail";

function App() {
  return (
    <div className="div-contenedor">
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Route path="/form" component={Form} />
            <Route path="/detail/:id" component={Detail} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
