const express = require('express');
const bodyParser = require('body-parser');
const PythonShellService = require('./infrastructure/externalServices/pythonShell');
const PythonService = require('./application/pythonService');
const PythonController = require('./presentation/controllers/pythonController');
const pythonRoutes = require('./presentation/routes/pythonRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.text());

// Dependency Injection
// const pythonShellService = new PythonShellService();
const pythonService = new PythonService();
const pythonController = new PythonController(pythonService);

// Routes
app.use('/python-to-image', pythonRoutes(pythonController));

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});