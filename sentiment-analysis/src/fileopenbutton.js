import React, { useRef } from 'react';

const FileUploadButton = () => {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
            // Perform further file processing here
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Upload File</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />
        </div>
    );
};

export default FileUploadButton;