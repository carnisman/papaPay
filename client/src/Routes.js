import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PapaWeb from "./pages/";
import Tutor from "./pages/tutor";
import Student from "./pages/student";
import ApproveCourse from "./pages/papaApprove";
import CreateCourse from "./pages/papaCreate";
import TutorLesson from "./pages/tutorlesson";
import StudentLesson from "./pages/studentlesson";
import Submenu from "./pages/Submenu";


const Routes = (prop) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} render={props => <><Submenu isConnected={prop.isConnected} /><PapaWeb/></>} />
        <Route exact path={ "/tutor"} render={props => <><Submenu isConnected={prop.isConnected} /><Tutor/></>} />
        <Route exact path={ "/student"} render={props => <><Submenu isConnected={prop.isConnected} /><Student/></>} />
        <Route exact path={ "/papaCreate"} render={props => <><Submenu isConnected={prop.isConnected} /><CreateCourse papapay={prop.papapay} papaCreate={prop.papaCreate} /></>} />
        <Route exact path={ "/papaApprove"} render={props => <><Submenu isConnected={prop.isConnected} /><ApproveCourse papapay={prop.papapay} papaApprove={prop.papaApprove} /></>} />
        <Route exact path={ "/tutorlesson"} render={props => <><Submenu isConnected={prop.isConnected} /><TutorLesson papapay={prop.papapay} /></>} />
        <Route exact path={ "/studentlesson"} render={props => <><Submenu isConnected={prop.isConnected} /><StudentLesson papapay={prop.papapay} /></>} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;

