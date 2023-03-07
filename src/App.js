import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SmallBoats from './containers/SmallBoats/SmallBoats';
import LoginPage from './components/LoginPage/LoginPage';
import Certificates from './containers/CertificatesComponent/Certificates';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BoatInfo from "./components/BoatInfo/BoatInfo";
import Certificate from "./components/Certificate/Certificate";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import React from "react";
import BasesBuildings from "./containers/BasesBuildings/BasesBuildings";
import {useDispatch} from "react-redux";
import {getDictionaryGimsSections, getDictionaryOwnerType} from "./redux/actions";


function App() {
    const dispatch = useDispatch()
    dispatch(getDictionaryGimsSections())
    dispatch(getDictionaryOwnerType())
  return (
    <Router>
      <Header showButton={true} />
      <Sidebar />
      <div className='wrapper'>
          <Routes>
              <Route path="/smallboats" element={<SmallBoats />} />
              <Route path="/smallboats/boatId/:id" element={<BoatInfo />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/certificates/licenseId/:id" element={<Certificate />} />
              <Route path="/basesbuilding" element={<BasesBuildings/>}/>
              <Route path="*" element={<Navigate replace to="/smallboats" />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
