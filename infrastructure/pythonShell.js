let { PythonShell } = require('python-shell');

class PythonShellService {
  async runScript(scriptPath, options) {
    return new Promise((resolve, reject) => {
      PythonShell.run(scriptPath, options)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = PythonShellService;