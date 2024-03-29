const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Add body-parser to parse JSON in the request
app.use(bodyParser.json());

// Array of employee data
const employees = [
  { id: 1, name: 'John Doe', position: 'Manager' },
  { id: 2, name: 'Jane Smith', position: 'Developer' },
  { id: 3, name: 'Mike Johnson', position: 'Designer' },
];

// POST route to add an employee
app.post('/employees', (req, res) => {
  if (!req.body.name || !req.body.position) {
    return res.status(400).json({ error: 'Name and position are required' });
  }

  if (employees.find((emp) => emp.name === req.body.name)) {
    return res.status(400).json({ error: 'Employee already exists' });
  }

  const employee = {
    id: employees.length + 1,
    name: req.body.name,
    position: req.body.position,
  };

  employees.push(employee);
  res.json(employee);
});

// GET route to filter employees by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// GET route to return all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// DELETE route to remove an employee
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex((emp) => emp.id === id);

  if (index !== -1) {
    employees.splice(index, 1);
    res.json({ message: 'Employee removed' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
});

// PUT route to update an employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  if (req.body.name) {
    employee.name = req.body.name;
  }

  if (req.body.position) {
    employee.position = req.body.position;
  }

  res.json(employee);
});

// Start the server
const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

module.exports = { app, server };

process.on('uncaughtException', function (err) {
  if (err.code === 'EADDRINUSE') {
    console.log('Port 8080 is already in use');
  } else {
    console.error(err);
  }
});
