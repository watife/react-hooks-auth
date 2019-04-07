import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";
import Authenticated from "./Components/Authenticated";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/auth" exact component={Authenticated} /> */}

        <Route path="/login" exact component={Login} />
        <Authenticated>
          <Route path="/" exact component={Homepage} />
        </Authenticated>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
