const express = require('express');
const app = express();

// Array of employee data
const employees = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Developer' },
    { id: 3, name: 'Mike Johnson', position: 'Designer' },
];

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

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
