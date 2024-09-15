const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema and model
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model('User', userSchema);

// Route to get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a new user
app.post('/api/users', async (req, res) => {
    const { name } = req.body;
    try {
        const newUser = new User({ name });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
