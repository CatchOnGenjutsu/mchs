import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataBase from './components/DataBase.js';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataBase />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
