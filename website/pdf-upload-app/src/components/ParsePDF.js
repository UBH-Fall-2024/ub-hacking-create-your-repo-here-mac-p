import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ParsePDF() {
    const { filename } = useParams(); // Get filename from URL
    const [pdfText, setPdfText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPdfText = async () => {
            try {
                const response = await axios.get(`http://localhost:5200/parse-pdf/${filename}`);
                setPdfText(response.data.text);
            } catch (error) {
                setPdfText('Error parsing the PDF file.');
            } finally {
                setLoading(false);
            }
        };

        fetchPdfText();
    }, [filename]);

    return (
        <div className="parse-container">
            <h2>Parsed PDF Content</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <textarea
                    value={pdfText}
                    readOnly
                    rows="20"
                    cols="100"
                    style={{ width: '80%', height: '400px' }}
                />
            )}
        </div>
    );
}

export default ParsePDF;
