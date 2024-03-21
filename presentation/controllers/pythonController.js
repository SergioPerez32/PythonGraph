const InputModel = require('../../domain/inputModel');
const OutputModel = require('../../domain/outputModel');


class PythonController {
    constructor(pythonService) {
      this.pythonService = pythonService;
    }
  
    async executePython(req, res) {
      try {
        const inputModel = new InputModel(req.body);
        const image = await this.pythonService.executeCode(inputModel.code);
        const outputModel = new OutputModel(image);
        res.status(201).contentType('image/png').send(outputModel.image);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
    }
  }
  
  module.exports = PythonController;