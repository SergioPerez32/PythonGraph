let { PythonShell } = require('python-shell');
const fs = require('fs');

class PythonService {
  async executeCode(pythonCode) {
    const tempPythonFile = '../temp.py';
    fs.writeFileSync(tempPythonFile, pythonCode);
    const options = {
      scriptPath: __dirname,
      args: []
    };
    return new Promise((resolve, reject) => {
      PythonShell.run(tempPythonFile, options)
        .then(() => {
          const imageFile = 'image.png';
          try {
            const image = fs.readFileSync(imageFile);
            //delete temp.y and image.png
            resolve(image);
          } catch (error) {
            reject('Error reading image file');
          }
        })
        .catch((err) => {
          reject('Error executing Python code');
        });
    });
  }
}

module.exports = PythonService;