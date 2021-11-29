import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PapaWeb from "./pages/";
import Tutor from "./pages/tutor";
import CreateCourse from "./pages/papaCreate";
import TutorLesson from "./pages/tutorlesson";
import StudentLesson from "./pages/studentlesson";
import Submenu from "./pages/Submenu";

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
              myChain={prop.myChain}
            />
            <PapaWeb/>
          </>} />
        <Route exact path={ "/tutor"} render={() =>
          <>
            <Submenu
              isConnected={prop.isConnected}
              papaAddress={prop.papaAddress}
              ethAccount={prop.ethAccount}
              myChain={prop.myChain}
            />
            <Tutor/>
          </>} />
        <Route exact path={ "/papaCreate"} render={() =>
          <>
          <Submenu
            isConnected={prop.isConnected}
            papaAddress={prop.papaAddress}
            ethAccount={prop.ethAccount}
            myChain={prop.myChain}
          />
          <CreateCourse
            papapay={prop.papapay}
            papaCreate={prop.papaCreate}
            cleanExe={prop.cleanExe}
            cleanBlockchainData={prop.cleanBlockchainData}
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
            myChain={prop.myChain}
          />
          <TutorLesson
            papas={prop.papas}
            papapay={prop.papapay}
            cleanExe={prop.cleanExe}
            cleanBlockchainData={prop.cleanBlockchainData}
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
            myChain={prop.myChain}
          />
          <StudentLesson
            papapay={prop.papapay}
            papas={prop.papas}
            cleanExe={prop.cleanExe}
            cleanBlockchainData={prop.cleanBlockchainData}
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

