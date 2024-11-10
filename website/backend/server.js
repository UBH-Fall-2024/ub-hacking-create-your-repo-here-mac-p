const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');  // Import the pdf-parse library

const app = express();
const PORT = 5100;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload', upload.single('pdfFile'), (req, res) => {
    if (req.file) {
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: req.file.path
        });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

// Route to fetch and parse PDF file
app.get('/parse-pdf/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
    }

    // Read and parse the PDF file
    const pdfData = fs.readFileSync(filePath);
    pdfParse(pdfData).then((data) => {
        // Send the text of the PDF as response
        res.status(200).json({ text: data.text });
    }).catch((err) => {
        res.status(500).json({ message: 'Error parsing PDF', error: err });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
