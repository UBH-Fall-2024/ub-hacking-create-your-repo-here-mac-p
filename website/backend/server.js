const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdfParse = require('pdf-parse');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up storage for PDF files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define where PDFs will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with unique filename
    },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Endpoint to handle PDF upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Return the file path to the frontend
    res.json({ filePath: req.file.path });
});

// Endpoint to parse the uploaded PDF and return text content
app.get('/parse/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'File not found' });
        }

        pdfParse(data).then((pdfData) => {
            res.json({ text: pdfData.text }); // Return the parsed text
        }).catch((err) => {
            res.status(500).json({ error: 'Error parsing PDF' });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
