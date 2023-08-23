const express = require('express');
const bodyParser = require('body-parser');
const items = require('./fakeDb');

const app = express();
app.use(bodyParser.json());

//  Get the list of shopping items
app.get('/items', (req, res) => {
  res.json(items);
});

//Add a new item to the shopping list
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json({ added: newItem });
});

 //Get details of a single item
app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const item = items.find(item => item.name === itemName);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

 //Update details of a single item
app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;

  const index = items.findIndex(item => item.name === itemName);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json({ updated: items[index] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

//  Delete a specific item from the array
app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const index = items.findIndex(item => item.name === itemName);
  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;