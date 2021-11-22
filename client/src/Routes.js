import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PapaWeb from "./pages/";
import Tutor from "./pages/tutor";
import CreateCourse from "./pages/papaCreate";
import TutorLesson from "./pages/tutorLesson";
import StudentLesson from "./pages/studentLesson";
import Submenu from "./pages/submenu";

const Routes = (prop) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} render={props => 
          <>
            <Submenu 
              isConnected={prop.isConnected} 
            />
            <PapaWeb/>
          </>} />
        <Route exact path={ "/tutor"} render={props => 
          <>
            <Submenu 
              isConnected={prop.isConnected} 
            />
            <Tutor/>
          </>} />
        <Route exact path={ "/papaCreate"} render={props => 
          <>
          <Submenu 
            isConnected={prop.isConnected}
          />
          <CreateCourse
            papapay={prop.papapay}
            papaCreate={prop.papaCreate}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            executed={prop.executed}
          />
        </>} />
        <Route exact path={ "/tutorLesson"} render={props =>
          <>
          <Submenu
            isConnected={prop.isConnected}
          />
          <TutorLesson
            papas={prop.papas}
            papapay={prop.papapay}
            papaInitLesson={props.papaInitLesson}
            papaWithdraw={props.papaWithdraw}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            executed={prop.executed}
          />
        </>} />
        <Route exact path={ "/studentLesson"} render={props =>
          <>
          <Submenu
            isConnected={prop.isConnected}
          />
          <StudentLesson
            papapay={prop.papapay}
            papas={prop.papas}
            papaApprove={prop.papaApprove}
            papaAttendLesson={prop.papaAttendLesson}
            papaRecover={prop.papaRecover}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            executed={prop.executed}
          />
        </>} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;

