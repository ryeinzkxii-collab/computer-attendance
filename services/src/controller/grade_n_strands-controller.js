const gradeNStrandService = require("../services/grade_n_strands-service.js");

// CREATE - Add a new grade level and strand combination
const createGradeNStrand = async (req, res) => {
  try {
    const { grade_level, strand, description } = req.body;

    const result = await gradeNStrandService.createGradeNStrand(grade_level, strand, description);

    return res.status(201).json({
      success: true,
      message: "Grade level and strand created successfully.",
      data: {
        id: result.insertId,
        grade_level,
        strand,
        description,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create grade level and strand.",
    });
  }
};

// READ - Get all grade level and strand records
const findAllGradeNStrands = async (req, res) => {
  try {
    const gradeNStrands = await gradeNStrandService.findAllGradeNStrands();

    return res.status(200).json({
      success: true,
      count: gradeNStrands.length,
      data: gradeNStrands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch grade levels and strands.",
    });
  }
};

// READ - Get grade and strand by ID
const findGradeNStrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const gradeNStrand = await gradeNStrandService.findGradeNStrandById(id);

    if (!gradeNStrand) {
      return res.status(404).json({
        success: false,
        message: "Grade level and strand record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: gradeNStrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve grade level and strand.",
    });
  }
};

// READ - Search grade level and strand by grade_level and strand params
const findGradeNStrand = async (req, res) => {
  try {
    const { grade_level, strand } = req.query;

    const gradeNStrand = await gradeNStrandService.findGradeNStrand(grade_level, strand);

    if (!gradeNStrand) {
      return res.status(404).json({
        success: false,
        message: "Grade level and strand combination not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: gradeNStrand,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve grade level and strand.",
    });
  }
};

// UPDATE - Update grade level and strand by ID
const updateGradeNStrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade_level, strand, description } = req.body;

    const result = await gradeNStrandService.updateGradeNStrand(id, grade_level, strand, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Grade level and strand record not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Grade level and strand updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update grade level and strand.",
    });
  }
};

// DELETE - Remove grade level and strand by ID
const deleteGradeNStrand = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await gradeNStrandService.deleteGradeNStrand(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Grade level and strand record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Grade level and strand deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete grade level and strand.",
    });
  }
};

module.exports = {
  createGradeNStrand,
  findAllGradeNStrands,
  findGradeNStrandById,
  findGradeNStrand,
  updateGradeNStrand,
  deleteGradeNStrand,
};
