const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

// Import the main function from huggingface.js
const analyzeFile = require('/Users/olivervarney/IdeaProjects/MeetingMetric2/.github/src/huggingface.js');

const app = express();
const PORT = 5901;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Clear uploads folder on server start (optional)
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

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage: storage });

// Route to handle file uploads and trigger analyzing
app.post('/upload', upload.single('pdfFile'), async (req, res) => {
    if (req.file) {
        const filePath = req.file.path;
        try {
            // Trigger the analysis in the background
            await analyzeFile(filePath);

            res.status(200).json({
                message: 'File uploaded successfully and analysis started',
                filePath: filePath
            });
        } catch (error) {
            res.status(500).json({ message: 'Error during analysis', error: error.message });
        }
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

// Route to parse a .txt file
app.get('/parse-txt/:filename', async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    try {
        // Ensure the file exists
        await fs.access(filePath);

        // Read the .txt file content
        const fileContent = await fs.readFile(filePath, 'utf-8');  // Read the file as UTF-8 string
        res.status(200).json({ text: fileContent });
    } catch (err) {
        res.status(404).json({ message: 'File not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});