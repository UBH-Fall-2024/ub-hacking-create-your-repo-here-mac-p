const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const pdfParse = require('pdf-parse');  // Import the pdf-parse library

const app = express();
const PORT = 5200;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Asynchronous function to clear the uploads folder
const clearUploadsFolder = async () => {
    try {
        const files = await fs.readdir(UPLOADS_DIR);
        for (const file of files) {
            const filePath = path.join(UPLOADS_DIR, file);
            await fs.unlink(filePath);
            console.log(`Deleted file: ${file}`);
        }
    } catch (err) {
        console.error('Error clearing uploads folder:', err);
    }
};

// Clear the uploads folder when the server starts
clearUploadsFolder();

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
app.get('/parse-pdf/:filename', async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    try {
        // Check if the file exists
        await fs.access(filePath);

        // Read and parse the PDF file
        const pdfData = await fs.readFile(filePath);
        pdfParse(pdfData).then((data) => {
            // Send the text of the PDF as response
            res.status(200).json({ text: data.text });
        }).catch((err) => {
            res.status(500).json({ message: 'Error parsing PDF', error: err });
        });
    } catch (err) {
        res.status(404).json({ message: 'File not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
