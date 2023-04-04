import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './components/LoginPage/LoginPage';
import SmallBoats from './containers/SmallBoats/SmallBoats';
import Certificates from './containers/CertificatesComponent/Certificates';
import BasesBuildings from "./containers/BasesBuildings/BasesBuildings";
import BoatInfo from "./components/BoatInfo/BoatInfo";
import Certificate from "./components/Certificate/Certificate";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import SmallBoatsRegistration from './containers/SmallBoatsRegistration/SmallBoatsRegistration';
import AppBoatReg from './components/AppBoatReg/AppBoatReg';
import RegistrationInformationChanges from './containers/RegistrationInformationChanges/RegistrationInformationChanges'
import {
  getDictionaryGimsSections,
  getDictionaryNsiCheckStatus,
  getDictionaryOwnerType,
  getUsersLibrary,
  getAteLibrary,
  getApplicationRegLibrary
} from "./redux/actions";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [isLogin, setIsLoginApp]= useState("");
  
  useEffect(() => {
    window.location.pathname.includes("login") ? setIsLoginApp("login") : setIsLoginApp("")
    dispatch(getDictionaryGimsSections());
    dispatch(getDictionaryOwnerType());
    dispatch(getDictionaryNsiCheckStatus());
    dispatch(getUsersLibrary());
    dispatch(getAteLibrary());
    dispatch(getApplicationRegLibrary());
  }, [window.location.pathname])

  return (
    <Router>
      <Header />
      {!isLogin && <Sidebar />}
      {isLogin 
        ? <LoginPage /> 
        : <div className='wrapper'>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/smallboats" element={<SmallBoats />} />
              <Route path="/smallboats/boatId/:id" element={<BoatInfo />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/certificates/licenseId/:id" element={<Certificate />} />
              <Route path="/basesbuilding" element={<BasesBuildings />} />
              <Route path="/smallboatsreg" element={<SmallBoatsRegistration />} />
              <Route path="/smallboatsreg/app/:id" element={<AppBoatReg />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
              <Route path="/reginformationchanges" element={<RegistrationInformationChanges/>}/>
            </Routes>
          </div>
      } 
    </Router>
  );
}

export default App;
