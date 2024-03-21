const express = require('express');
let { PythonShell } = require('python-shell');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.text());

app.post('/python-to-image', async (req, res) => {
  const pythonCode = req.body;
  const tempPythonFile = 'temp.py';
  fs.writeFileSync(tempPythonFile, pythonCode);
  const options = {
    scriptPath: __dirname,
    args: []
  };
  PythonShell.run(tempPythonFile, options)
    .then(() => {
      const imageFile = 'image.png';
      try {
        const image = fs.readFileSync(imageFile);
        res.status(201).contentType('image/png').send(image);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error reading image file' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error executing Python code' });
    });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});