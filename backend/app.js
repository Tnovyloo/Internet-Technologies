// Import important packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 5000;

// Set-up server.
const app = express();
app.use(cors());
app.use(express.json());

// Set-up mongoose
mongoose.connect("mongodb://mongo:27017/tasks", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));


const ItemSchema = new mongoose.Schema({
  name: String,
  description: String
})

const Item = mongoose.model("Item", ItemSchema)

// TODO make an CRUD operations.
app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
