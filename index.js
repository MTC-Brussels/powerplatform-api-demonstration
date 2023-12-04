const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const employee = employees.find(emp => emp.id === id);

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

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
