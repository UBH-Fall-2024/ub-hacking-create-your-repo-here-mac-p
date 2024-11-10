import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';      // Import your Login component
import Upload from './components/Upload';    // Import your Upload component
import ParsePDF from './components/ParsePDF';// Import the ParsePDF component
import './App.css'; // Import your CSS styles

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />                {/* Login page route */}
                    <Route path="/upload" element={<Upload />} />          {/* File upload page route */}
                    <Route path="/parse/:filename" element={<ParsePDF />} /> {/* PDF parsing page route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
