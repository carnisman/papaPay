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
        <Route exact path={"/"} render={() =>
          <>
            <Submenu
              isConnected={prop.isConnected}
              papaAddress={prop.papaAddress}
              ethAccount={prop.ethAccount}
            />
            <PapaWeb/>
          </>} />
        <Route exact path={ "/tutor"} render={() =>
          <>
            <Submenu
              isConnected={prop.isConnected}
              papaAddress={prop.papaAddress}
              ethAccount={prop.ethAccount}
            />
            <Tutor/>
          </>} />
        <Route exact path={ "/papaCreate"} render={() =>
          <>
          <Submenu
            isConnected={prop.isConnected}
            papaAddress={prop.papaAddress}
            ethAccount={prop.ethAccount}
          />
          <CreateCourse
            papapay={prop.papapay}
            papaCreate={prop.papaCreate}
            cleanExe={prop.cleanExe}
            cleanBlochainData={prop.cleanBlochainData}
            papaAddress={prop.papaAddress}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            crExe={prop.crExe}
          />
        </>} />
        <Route exact path={ "/tutorLesson"} render={() =>
          <>
          <Submenu
            isConnected={prop.isConnected}
            papaAddress={prop.papaAddress}
            ethAccount={prop.ethAccount}
          />
          <TutorLesson
            papas={prop.papas}
            papapay={prop.papapay}
            cleanExe={prop.cleanExe}
            cleanBlochainData={prop.cleanBlochainData}
            papaInitLesson={prop.papaInitLesson}
            papaWithdraw={prop.papaWithdraw}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            tuExe={prop.tuExe}
          />
        </>} />
        <Route exact path={ "/studentLesson"} render={() =>
          <>
          <Submenu
            isConnected={prop.isConnected}
            papaAddress={prop.papaAddress}
            ethAccount={prop.ethAccount}
          />
          <StudentLesson
            papapay={prop.papapay}
            papas={prop.papas}
            cleanExe={prop.cleanExe}
            cleanBlochainData={prop.cleanBlochainData}
            papaApprove={prop.papaApprove}
            papaAttendLesson={prop.papaAttendLesson}
            papaRecover={prop.papaRecover}
            receiptTx={prop.receiptTx}
            errorMsg={prop.errorMsg}
            stExe={prop.stExe}
          />
        </>} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;

