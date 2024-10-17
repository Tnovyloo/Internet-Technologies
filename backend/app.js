// Import important packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;

const Item = require('./models/Item')

// Set-up server.
const app = express();
app.use(cors());
app.use(express.json());

// Set-up mongoose
mongoose.connect("mongodb://mongo:27017/tasks", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));



// App /tasks post method provider.
// Post data:
// label: String, required
  //  description: String, required,
  //  user: String, required,
  //  label: String, required
app.post('/tasks', async (req, res) => {
  
  const sessionKey = req.headers['x-session-key']
  console.log(sessionKey, typeof(sessionKey))

  const userName = req.headers['user-name']

  try {
    if (!sessionKey) {
      return res.status(400).json({ message: 'Session key is required in Headers!' });
    }

    if (!userName) {
      return res.status(400).json({ message: 'Username is required in Headers!'});
    }
    
    const newItem = new Item({
      label: req.body.label,
      sessionHash: sessionKey, // Attach session key here
      description: req.body.description,
      user: userName,
      status: req.body.status,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem)
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }

    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

})

// App /items get method provider
//  Returns all items with the same x-session-key
app.get('/tasks', async (req, res) => {
  try {
    // Extract session key from request headers
    const sessionKey = req.headers['x-session-key'];

    // If no session key is provided, return an error
    if (!sessionKey) {
      return res.status(400).json({ message: 'Session key is required' });
    }

    // Find all items that match the session key (sessionHash)
    const items = await Item.find({ sessionHash: sessionKey });

    // Respond with the filtered items
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
