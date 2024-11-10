import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Upload from './components/Upload';
import ParsePDF from './components/ParsePDF';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/parse/:filename" element={<ParsePDF />} />
            </Routes>
        </Router>
    );
}

export default App;
