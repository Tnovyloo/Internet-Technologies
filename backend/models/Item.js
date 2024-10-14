const mongoose = require('mongoose');

// Counter schema to track the auto-increment value
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // This will be the name of the collection to track (e.g., "items")
  seq: { type: Number, default: 0 } // This will store the auto-incrementing number
});

const Counter = mongoose.model('Counter', counterSchema);

const ItemSchema = new mongoose.Schema({
  label: { type: String, unique: false, required: [true, "label is required"]},
  sessionHash: { type: String, unique: false, required: [true, "sessionHash is required"]},
  description: { type: String, unique: false, required: [true, "description is required"]},
  user: { type: String, unique: false, required: [true, "user is required"]},
  date: { type: String, default: () => new Date().toLocaleString('en-GB', { timeZone: 'UTC', hour12: false }) }, // Default formatted date
  id: { type: Number, unique: true }, // Ensure `id` is unique and uses a number type for auto-increment
  status: { 
    type: String, 
    enum: ['todo', 'work-in-progress', 'in-review', 'ended'],  // Allowed values
    required: [true, "status (of task) is required"]
    // default: 'todo'  // Default value
  }
})

// Pre-save hook to auto-increment the `id` field
ItemSchema.pre('save', async function (next) {
  const item = this;

  // Only generate an auto-increment ID if it's a new item
  if (item.isNew) {
    try {
      // Find the counter document for the `items` collection
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'items' },  // Specify the collection name (or category) to track
        { $inc: { seq: 1 } },  // Increment the counter by 1
        { new: true, upsert: true }  // Create if it doesn't exist
      );
      
      // Assign the incremented `seq` value to the `id` field
      item.id = counter.seq;

      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next();  // If the item is not new, proceed without generating a new `id`
  }
});

const Item = mongoose.model("Item", ItemSchema)

module.exports = Item;