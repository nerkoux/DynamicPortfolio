const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Configure S3 client (for R2)
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://<YOUR-ACCOUNT-ID>.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: '<YOUR-ACCESS-ID>',
    secretAccessKey: '<YOUR-SECRET-ACCESS-KEY>',
  },
});

// Updated route for user registration with image upload
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const userData = JSON.parse(JSON.stringify(req.body));
    
    // Handle file upload to R2
    if (req.file) {
      const file = req.file;
      const fileName = `${Date.now()}_${path.basename(file.originalname)}`;

      await s3Client.send(new PutObjectCommand({
        Bucket: '<YOUR-BUCKET-URL>',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      userData.imageUrl = `https://<YOUR-R2-URL>/${fileName}`;
    }

    // Parse JSON strings back into objects/arrays
    ['skills', 'education', 'internships', 'projects'].forEach(field => {
      if (userData[field]) {
        userData[field] = JSON.parse(userData[field]);
      }
    });

    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: error.message });
  }
});

// Route for fetching portfolio
router.get('/portfolio/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;