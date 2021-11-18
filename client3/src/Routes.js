import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PapaWeb from "./pages/";
import Tutor from "./pages/tutor";
import Student from "./pages/student";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={PapaWeb} />
        <Route exact path={ "/tutor"} component={Tutor} />
        <Route exact path={ "/student"} component={Student} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;

