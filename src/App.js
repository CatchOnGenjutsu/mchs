import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/GeneralComponents/LoginPage/LoginPage";
import SmallBoats from "./containers/DataBaseContainers/SmallBoats/SmallBoats";
import Certificates from "./containers/DataBaseContainers/CertificatesContainer/CertificatesContainer";
import BasesBuildings from "./containers/DataBaseContainers/BasesBuildings/BasesBuildings";
import BoatInfo from "./components/DataBaseComponents/BoatInfo/BoatInfo";
import Certificate from "./components/DataBaseComponents/Certificate/Certificate";
import Header from "./components/GeneralComponents/Header/Header";
import Sidebar from "./components/GeneralComponents/Sidebar/Sidebar";
import SmallBoatsRegistration from "./containers/AdministrativeProcedures/SmallBoatsRegistration/SmallBoatsRegistration";
import AppBoatReg from "./components/AdministrativeProcedures/AppBoatReg/AppBoatReg";
import RegistrationInformationChanges from "./containers/AdministrativeProcedures/RegistrationInformationChanges/RegistrationInformationChanges";
import FormSearchBoatCard from "./containers/FormSearchBoatCard/FormSearchBoatCard";
import IndividualStatement from "./components/AdministrativeProcedures/registrationInformationChanges/IndividualStatement/IndividualStatement";
import DecisionCard from "./components/AdministrativeProcedures/commonComponents/DecisionCard/DecisionCard";
import TechnicalExaminationContainer from "./containers/AdministrativeProcedures/TechnicalExaminationContainer/TechnicalExaminationContainer";
import NSI from "./containers/NSI/NSI";
import ClassificationBoats from "./components/NSI/ClassificationBoats/ClassificationBoats";
import Legislation from "./components/NSI/Legislation/Legislation";
import Forms from "./components/NSI/Forms/Forms";
import PaidProcedures from "./components/NSI/PaidProcedures/PaidProcedures";
import Requisite from "./components/NSI/Requisites/Requisites";
import Contacts from "./components/NSI/Contacts/Contacts";
import SectionInfo from "./components/NSI/Contacts/SectionInfo/SectionInfo";
import AdministrativeProcedures from "./components/NSI/AdministrativeProcedures/AdministrativeProcedures";
import DuplicateShipsTicket from "./containers/AdministrativeProcedures/DuplicateShipsTicket/DuplicateShipsTicket";
import DuplShipsTicket from "./components/AdministrativeProcedures/DuplShipsTicket/DuplShipsTicket";
import ShipsTicket from "./containers/AdministrativeProcedures/ShipsTicket/ShipsTicket";
import ProvisionInformation from "./containers/AdministrativeProcedures/ProvisionInformation/ProvisionInformation";
import StatementProvisionInformation from "./components/AdministrativeProcedures/StatementProvisionInformation/StatementProvisionInformation";
import InspectorWorkStat from "./components/StatisticsAnalytics/InspectorWorkStat/InspectorWorkStat";
import Reports from "./containers/StatisticsContainers/Reports/Reports";
import TransportAccidentsReport from "./containers/StatisticsContainers/TransportAccidentsReport/TransportAccidentsReport";
import TransportAccidentForm from "./components/StatisticsAnalytics/TransportAccidentForm/TransportAccidentForm";
import WeeklyReport from "./containers/StatisticsContainers/WeeklyReport/WeeklyReport";
import ReportTrafficAccidents from "./containers/StatisticsContainers/ReportTrafficAccidents/ReportTrafficAccidents";
import CertificateIssuanceReport from "./containers/StatisticsContainers/CertificateIssuanceReport/CertificateIssuanceReport";
import QuarterlyReport from "./containers/StatisticsContainers/QuarterlyReport/QuarterlyReport";
import GraphsReport from "./containers/StatisticsContainers/GraphsReport/GraphsReport";
import ShortReport from "./containers/StatisticsContainers/ShortReport/ShortReport";
import TechnicalExaminationApp from "./components/AdministrativeProcedures/TechnicalExaminationApp/TechnicalExaminationApp";

import {
  getDictionaryGimsSections,
  getDictionaryNsiCheckStatus,
  getDictionaryOwnerType,
  getUsersLibrary,
  getAteLibrary,
  getApplicationRegLibrary,
} from "./redux/actions";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const [isLogin, setIsLoginApp] = useState("");

  useEffect(() => {
    window.location.pathname.includes("login") ? setIsLoginApp("login") : setIsLoginApp("");
    dispatch(getDictionaryGimsSections());
    dispatch(getDictionaryOwnerType());
    dispatch(getDictionaryNsiCheckStatus());
    dispatch(getUsersLibrary());
    dispatch(getAteLibrary());
    dispatch(getApplicationRegLibrary());
    // setActiveItem(window.location.pathname.split("/")[1]);
  }, [dispatch]);

  return (
    <Router>
      <Header />
      {!isLogin && <Sidebar />}
      {isLogin ? (
        <LoginPage />
      ) : (
        <div className="wrapper">
          <Routes>
            <Route
              path="*"
              element={
                <Navigate
                  replace
                  to="/login"
                />
              }
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/smallboats"
              element={<SmallBoats />}
            />
            <Route
              path="/smallboats/boatId/:id"
              element={<BoatInfo />}
            />
            <Route
              path="/certificates"
              element={<Certificates />}
            />
            <Route
              path="/certificates/licenseId/:id"
              element={<Certificate />}
            />
            <Route
              path="/basesbuilding"
              element={<BasesBuildings />}
            />
            <Route
              path="/smallboatsreg"
              element={<SmallBoatsRegistration />}
            />
            <Route
              path="/smallboatsreg/app/individual"
              element={<AppBoatReg />}
            />
            <Route
              path="/smallboatsreg/app/entity"
              element={<AppBoatReg />}
            />
            <Route
              path="/smallboatsreg/app/:id"
              element={<AppBoatReg />}
            />
            <Route
              path="/smallboatsreg/decisioncard/:id"
              element={<DecisionCard />}
            />
            <Route
              path="/reginformationchanges"
              element={<RegistrationInformationChanges />}
            />
            <Route
              path="/reginformationchanges/searchboatcard"
              element={<FormSearchBoatCard />}
            />
            <Route
              path="/reginformationchanges/individual/add"
              element={<IndividualStatement />}
            />
            <Route
              path="/reginformationchanges/entity/add"
              element={<IndividualStatement />}
            />
            <Route
              path="/reginformationchanges/statement/:id"
              element={<IndividualStatement />}
            />
            <Route
              path="/reginformationchanges/decisioncard/:id"
              element={<DecisionCard />}
            />
            <Route
              path="/dupshipsticket"
              element={<DuplicateShipsTicket />}
            />
            <Route
              path="/dupshipsticket/searchboatcard"
              element={<FormSearchBoatCard />}
            />
            <Route
              path="/dupshipsticket/:id"
              element={<DuplShipsTicket />}
            />
            <Route
              path="/dupshipsticket/decisioncard/:id"
              element={<DecisionCard />}
            />
            <Route
              path="/shipsticket"
              element={<ShipsTicket />}
            />
            <Route
              path="/shipsticket/decisioncard/boatCardAppId/:id"
              element={<DecisionCard />}
            />
            <Route
              path="/shipsticket/decisioncard/boatCardModifId/:id"
              element={<DecisionCard />}
            />
            <Route
              path="/provisioninformation"
              element={<ProvisionInformation />}
            />
            <Route
              path="/provisioninformation/individual/add"
              element={<StatementProvisionInformation />}
            />
            <Route
              path="/provisioninformation/entity/add"
              element={<StatementProvisionInformation />}
            />
            <Route
              path="/provisioninformation/statement/:id"
              element={<StatementProvisionInformation />}
            />
            <Route
              path="/provisioninformation/decisioncard/:id"
              element={<StatementProvisionInformation />}
            />
            <Route
              path="techexamination"
              element={<TechnicalExaminationContainer />}
            />
            <Route
              path="/techexamination/searchboatcard"
              element={<FormSearchBoatCard />}
            />
            <Route
              path="/techexamination/:id"
              element={<TechnicalExaminationApp />}
            />
            <Route
              path="/inspectorworkstat"
              element={<InspectorWorkStat />}
            />
            <Route
              path="/reports"
              element={<Reports />}
            />
            <Route
              path="/nsi"
              element={<NSI />}
            />
            <Route
              path="/nsi/classificationBoats"
              element={<ClassificationBoats />}
            />
            <Route
              path="/nsi/legislation"
              element={<Legislation />}
            />
            <Route
              path="/nsi/forms"
              element={<Forms />}
            />
            <Route
              path="/nsi/paidproc"
              element={<PaidProcedures />}
            />
            <Route
              path="/nsi/requisites"
              element={<Requisite />}
            />
            <Route
              path="/nsi/contacts"
              element={<Contacts />}
            />
            <Route
              path="/nsi/contacts/:id"
              element={<SectionInfo />}
            />
            <Route
              path="/nsi/adminproc"
              element={<AdministrativeProcedures />}
            />
            <Route
              path="/transportaccidents"
              element={<TransportAccidentsReport />}
            />
            <Route
              path="/transportaccidents/add"
              element={<TransportAccidentForm />}
            />
            <Route
              path="/transportaccidents/accident/:id"
              element={<TransportAccidentForm />}
            />
            <Route
              path="/reports/weeklyreport"
              element={<WeeklyReport />}
            />
            <Route
              path="/reports/trafficaccidentsreport"
              element={<ReportTrafficAccidents />}
            />
            <Route
              path="/reports/certificateissuancereport"
              element={<CertificateIssuanceReport />}
            />
            <Route
              path="/reports/quarterlyreport"
              element={<QuarterlyReport />}
            />
            <Route
              path="/reports/graphs"
              element={<GraphsReport />}
            />
            <Route
              path="/reports/shortreport"
              element={<ShortReport />}
            />
          </Routes>
        </div>
      )}
    </Router>
  );
}

export default App;
