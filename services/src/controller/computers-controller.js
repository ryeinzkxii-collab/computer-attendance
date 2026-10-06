const computerService = require("../services/computers-service.js");

// CREATE - Register a new computer
const createComputer = async (req, res) => {
  try {
    const { pc_number, status } = req.body;

    const result = await computerService.createComputer(pc_number, status);

    return res.status(201).json({
      success: true,
      message: "Computer registered successfully.",
      data: {
        id: result.insertId,
        pc_number,
        status,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create computer.",
    });
  }
};

// READ - Get all computers
const findAllComputers = async (req, res) => {
  try {
    const computers = await computerService.findAllComputers();

    return res.status(200).json({
      success: true,
      count: computers.length,
      data: computers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch computers.",
    });
  }
};

// READ - Get computer by ID
const findComputerById = async (req, res) => {
  try {
    const { id } = req.params;

    const computer = await computerService.findComputerById(id);

    if (!computer) {
      return res.status(404).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve computer.",
    });
  }
};

// READ - Get computer by PC number
const findComputerByPcNumber = async (req, res) => {
  try {
    const { pc_number } = req.params;

    const computer = await computerService.findComputerByPcNumber(pc_number);

    if (!computer) {
      return res.status(404).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: computer,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve computer.",
    });
  }
};

// UPDATE - Update computer details by ID
const updateComputer = async (req, res) => {
  try {
    const { id } = req.params;
    const { pc_number, status } = req.body;

    const result = await computerService.updateComputer(id, pc_number, status);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Computer not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Computer updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update computer.",
    });
  }
};

// DELETE - Delete computer by ID
const deleteComputer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await computerService.deleteComputer(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Computer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Computer deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete computer.",
    });
  }
};

module.exports = {
  createComputer,
  findAllComputers,
  findComputerById,
  findComputerByPcNumber,
  updateComputer,
  deleteComputer,
};
