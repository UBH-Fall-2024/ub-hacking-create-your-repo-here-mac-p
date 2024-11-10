import React, { useState } from 'react';
import FileUploadButton from './fileopenbutton.js';

function App() {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClick = () => {
        setButtonClicked(!buttonClicked);
    };

    return (
        <div style={{ margin: 0, padding: 0 }}>
            {/* Banner at the top */}
            <div
                style={{
                    backgroundColor: '#282c34',
                    color: 'white',
                    padding: '20px 0',
                    textAlign: 'center',
                    fontSize: '24px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    zIndex: 1000
                }}
            >
                <h1>Welcome to My React Website</h1>
            </div>

            {/* Main content */}
            <div style={{ textAlign: 'center', marginTop: '100px' }}>


                <h2>Interactive Button Below</h2>
                <FileUploadButton></FileUploadButton>

            </div>
        </div>
    );
}

export default App;