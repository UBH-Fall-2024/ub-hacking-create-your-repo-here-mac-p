import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const [file, setFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('pdfFile', file);

            try {
                const response = await axios.post('http://localhost:5900/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setUploadMessage(response.data.message);

                // After successful upload, redirect to the parse page
                const fileName = response.data.filePath.split('/').pop();
                navigate(`/parse/${fileName}`);  // Redirect to the parse page with the filename
            } catch (error) {
                setUploadMessage('File upload failed.');
            }
        } else {
            alert('Please select a file.');
        }
    };//note

    return (
        <div className="upload-container">
            <h2>Upload Your TXT File</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept=".txt"  // Allow only .txt files
                    onChange={handleFileChange}
                    id="file-upload"
                    className="file-upload-input"
                    required
                />
                <label htmlFor="file-upload" className="file-upload-label">
                    {file ? file.name : ''} {/* Custom text */}
                </label>
                <button type="submit">Upload</button>
            </form>
            {uploadMessage && <p>{uploadMessage}</p>}
        </div>
    );
}

export default Upload;
