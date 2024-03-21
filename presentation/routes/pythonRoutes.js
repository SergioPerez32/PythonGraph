const express = require('express');
const router = express.Router();

module.exports = (pythonController) => {
  router.post('/', pythonController.executePython.bind(pythonController));
  return router;
};