import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DataBase from './components/DataBase.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataBase />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
