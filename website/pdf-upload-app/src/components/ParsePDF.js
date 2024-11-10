import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ParsePDF() {
    const [fileText, setFileText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFileText = async () => {
            try {
                const response = await axios.get('http://localhost:5900/parse-txt/output.txt');
                setFileText(response.data.text);
            } catch (error) {
                setFileText('Error reading the TXT file.');
            } finally {
                setLoading(false);
            }
        };//note

        fetchFileText();
    }, []);

    return (
        <div className="parse-container">
            <h2>Parsed TXT Content</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <textarea
                    value={fileText}
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