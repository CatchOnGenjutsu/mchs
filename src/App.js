import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SmallBoats from './containers/SmallBoats/SmallBoats';
import LoginPage from './components/LoginPage/LoginPage';
import Certificates from './containers/CertificatesComponent/Certificates';
import InfoTable from './components/BoatInfo/BoatInfo';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/smallboats" element={<SmallBoats />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="*" element={<Navigate replace to="/smallboats" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boatinfo" element={<InfoTable />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
