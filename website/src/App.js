import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';      // Login component
import Upload from './components/Upload';    // Upload component
import ParsePDF from './components/ParsePDF'; // ParsePDF component
import './App.css'; // Import your CSS styles

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />                {/* Login page */}
                    <Route path="/upload" element={<Upload />} />          {/* Upload PDF page */}
                    <Route path="/parse/:filename" element={<ParsePDF />} /> {/* PDF Parsing page */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
