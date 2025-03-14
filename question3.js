const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const tasks = [
  { id: 1, name: 'Task 1', description: 'Do homework' },
  { id: 2, name: 'Task 2', description: 'Go to gym' }
];

// Add a new task (CREATE)
app.post('/tasks', (req, res) => {
  const { name, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    name,
    description
  };
  tasks.push(newTask);
  res.json(tasks);
});

//  Get all tasks (READ)
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update a task (UPDATE)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const task = tasks.find(task => task.id === parseInt(id));
  if (task) {
    task.name = name;
    task.description = description;
    res.json(tasks);
  } else {
    res.status(404).send('Task not found');
  }
});

//  Delete a task (DELETE)
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === parseInt(id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json(tasks);
  } else {
    res.status(404).send('Task not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

