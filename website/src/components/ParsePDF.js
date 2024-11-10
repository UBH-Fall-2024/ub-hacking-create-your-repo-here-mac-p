import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ParsePDF() {
    const { filename } = useParams();
    const [pdfText, setPdfText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParsedPDF = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/parse/${filename}`);
                setPdfText(response.data.text);
            } catch (err) {
                setError('Error fetching parsed PDF');
            } finally {
                setLoading(false);
            }
        };

        fetchParsedPDF();
    }, [filename]);

    return (
        <div>
            <h2>Parsed PDF Content</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <textarea rows="20" cols="100" value={pdfText} readOnly />
        </div>
    );
}

export default ParsePDF;
