import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PapaWeb from "./pages/";
import Tutor from "./pages/tutor";
import Student from "./pages/student";
import ApproveCourse from "./pages/approvecourse";
import CreateCourse from "./pages/createcourse";
import TutorLesson from "./pages/tutorlesson";
import StudentLesson from "./pages/studentlesson";
import Submenu from "./pages/Submenu";


const Routes = (prop) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} render={props => <><Submenu isConnected={prop.isConnected} /><PapaWeb/></>} />
        <Route exact path={ "/tutor"} render={props => <><Submenu/><Tutor/></>} />
        <Route exact path={ "/student"} render={props => <><Submenu/><Student/></>} />
        <Route exact path={ "/approvecourse"} render={props => <><Submenu/><ApproveCourse/></>} />
        <Route exact path={ "/createcourse"} render={props => <><Submenu/><CreateCourse/></>} />
        <Route exact path={ "/studentlesson"} render={props => <><Submenu/><StudentLesson/></>} />
        <Route exact path={ "/tutorlesson"} render={props => <><Submenu/><TutorLesson/></>} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;

