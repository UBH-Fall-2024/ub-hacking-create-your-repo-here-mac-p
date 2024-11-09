import React from 'React';

export default function React() {
    import React, { useRef } from 'React';

    const Icon = {
        imageURL: 'https://www.svgrepo.com/show/533718/upload.svg',
        imageSize: 90,
    };

    function MyButton() {
        const fileInputRef = useRef(null);

        // Trigger file input when button is clicked
        const handleButtonClick = () => {
            fileInputRef.current.click();
        };

        // Handle file selection and upload
        const handleFileChange = async (event) => {
            const file = event.target.files[0];

            // Check if the selected file is a PDF
            if (file && file.type === 'application/pdf') {
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await fetch('http://localhost:8080/upload', {
                        method: 'POST',
                        body: formData,
                    });
                    if (response.ok) {
                        alert('File uploaded successfully!');
                    } else {
                        alert('File upload failed.');
                    }
                } catch (error) {
                    alert('An error occurred while uploading the file.');
                    console.error(error);
                }
            } else {
                alert('Please select a PDF file.');
            }
        };

        return (
            <div>
                <button
                    onClick={handleButtonClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px',
                    }}
                >
                    <img
                        src={Icon.imageURL}
                        alt="Upload Icon"
                        width={Icon.imageSize / 3}
                        height={Icon.imageSize / 3}
                    />
                    Upload PDF
                </button>
                {/* Hidden file input with PDF restriction */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="application/pdf" // Only allows PDF files to be selected
                    onChange={handleFileChange}
                />
            </div>
        );
    }

    export function App() {
        return (
            <div>
                <MyButton />
            </div>
        );
    }

}