// upload.js
import multer from 'multer';
import path from 'path';

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
        // Get the file extension and create a unique filename with a timestamp
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

// Initialize Multer with storage configuration
const upload = multer({ storage });

export default upload;

