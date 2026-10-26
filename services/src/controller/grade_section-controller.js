const gradeSectionService = require("../services/grade-section-service.js");

// CREATE
const createGradeSection = async (req, res) => {
  try {
    const { school_year_id, grade_n_strand_id, adviser_staff_id, section_name, description } = req.body;

    const result = await gradeSectionService.createGradeSection({
      school_year_id,
      grade_n_strand_id,
      adviser_staff_id,
      section_name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Grade section created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get all grade sections
const findAllGradeSections = async (req, res) => {
  try {
    const result = await gradeSectionService.findAllGradeSections();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get grade section by ID
const findGradeSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await gradeSectionService.findGradeSectionById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Grade section not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get grade sections by school year
const findGradeSectionsBySchoolYear = async (req, res) => {
  try {
    const { schoolYearId } = req.params;
    const result = await gradeSectionService.findGradeSectionsBySchoolYear(schoolYearId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get grade sections by grade and strand
const findGradeSectionsByGradeNStrand = async (req, res) => {
  try {
    const { gradeNStrandId } = req.params;
    const result = await gradeSectionService.findGradeSectionsByGradeNStrand(gradeNStrandId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Get grade sections by adviser
const findGradeSectionsByAdviser = async (req, res) => {
  try {
    const { adviserStaffId } = req.params;
    const result = await gradeSectionService.findGradeSectionsByAdviser(adviserStaffId);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// READ - Check specific grade section
const findGradeSection = async (req, res) => {
  try {
    const { school_year_id, grade_n_strand_id, section_name } = req.query;
    const result = await gradeSectionService.findGradeSection(school_year_id, grade_n_strand_id, section_name);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateGradeSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { school_year_id, grade_n_strand_id, adviser_staff_id, section_name, description } = req.body;

    const result = await gradeSectionService.updateGradeSection(id, {
      school_year_id,
      grade_n_strand_id,
      adviser_staff_id,
      section_name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Grade section updated successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteGradeSection = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await gradeSectionService.deleteGradeSection(id);

    return res.status(200).json({
      success: true,
      message: "Grade section deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGradeSection,
  findAllGradeSections,
  findGradeSectionById,
  findGradeSectionsBySchoolYear,
  findGradeSectionsByGradeNStrand,
  findGradeSectionsByAdviser,
  findGradeSection,
  updateGradeSection,
  deleteGradeSection,
};
