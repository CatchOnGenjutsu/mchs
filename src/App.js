import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './components/LoginPage/LoginPage';
import Certificates from './containers/CertificatesComponent/Certificates';
import SmallBoats from './containers/SmallBoats/SmallBoats';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BoatInfo from "./components/BoatInfo/BoatInfo";
import Certificate from "./components/Certificate/Certificate";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useDispatch} from 'react-redux';
import BasesBuildings from "./containers/BasesBuildings/BasesBuildings";
import {
  getDictionaryGimsSections,
  getDictionaryNsiCheckStatus,
  getDictionaryOwnerType,
  getUsersLibrary
} from "./redux/actions";


function App() {
  const [isLogin, setIsLoginApp]= useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDictionaryGimsSections());
    dispatch(getDictionaryOwnerType());
    dispatch(getDictionaryNsiCheckStatus());
    dispatch(getUsersLibrary());
    window.location.pathname.includes("login") ? setIsLoginApp("login") : setIsLoginApp("")
  }, [window.location.pathname])

    // const BasesBuildings = React.lazy(()=>import("./containers/BasesBuildings/BasesBuildings"))
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
              <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
          </div>
      } 
    </Router>
  );
}

export default App;
