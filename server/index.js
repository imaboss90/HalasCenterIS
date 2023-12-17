const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const QRCode = require('qrcode');


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://ryanwal28:sKraeNxXHgHM9i7F@cluster0.sxds02s.mongodb.net/?retryWrites=true&w=majority');


// Define routes here

// Routes


// Example function to generate a QR code for a user


  // Add a route for QR code generation and retrieval
app.get('/users/:userId/qr', async (req, res) => {
    try {
      const qrCodeImage = await generateQRCodeForUser(req.params.userId);
      res.json({ qrCode: qrCodeImage });
    } catch (error) {
      res.status(500).send('Error generating QR code');
    }
  });
  
// POST route to add a user
app.post('/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  });
  

  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  });

  app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Error fetching user');
    }
  });

  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) return res.status(404).send('User not found');
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  });
  
  app.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).send('User not found');
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting user');
    }
  });
  
  app.post('/login', async (req, res) => {
    console.log('Login endpoint hit');
    console.log('Login Request:', req.body);
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if(!user) {
        return res.status(401).send('Invalid Credentials');
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if(!isMatch) {
        return res.status(401).send('Invalid Credentials');
      }

      if(isMatch) {
        // Generate QR code token
        try {
          const qrCodeToken = await generateUniqueQRCodeToken(user._id);
          user.qrCodeToken = qrCodeToken;
          await user.save();
    
          console.log(`QR Code token saved for user ${user.username}`);
    
          res.status(200).json({ message: 'Login successful', qrCodeToken });
        } catch (error) {
          console.error('Error during QR code token generation:', error);
          res.status(500).send('Error during login');
        }
      }
      
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('Error during login');
    }
});

async function generateUniqueQRCodeToken(userId) {
  // Generate a unique string for QR code (e.g., UUID or any other mechanism)
  // Example: const uniqueString = uuidv4(); // using UUID
  // Here, you can also include other user-specific information if needed

  const qrCodeData = `${userId}-${new Date().toISOString()}`;
  const qrCodeImage = await QRCode.toDataURL(qrCodeData);

  console.log(`QR Code generated for user ID: ${userId}`);

  return qrCodeImage;
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));