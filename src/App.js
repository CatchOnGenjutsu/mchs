import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SmallBoats from './components/SmallBoats.jsx';
import LoginPage from './components/LoginPage';
import Certificates from './components/Certificates';
import InfoTable from './components/InfoTable';

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
