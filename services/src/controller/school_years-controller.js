const schoolYearService = require("../services/school_years-service.js");

// CREATE - Register a new school year
const createSchoolYear = async (req, res) => {
  try {
    const { staff_id, school_year, start_date, end_date, is_active } = req.body;

    const result = await schoolYearService.createSchoolYear(staff_id, school_year, start_date, end_date, is_active);

    return res.status(201).json({
      success: true,
      message: "School year created successfully.",
      data: {
        id: result.insertId,
        staff_id,
        school_year,
        start_date,
        end_date,
        is_active,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create school year.",
    });
  }
};

// READ - Get all school years
const findAllSchoolYears = async (req, res) => {
  try {
    const schoolYears = await schoolYearService.findAllSchoolYears();

    return res.status(200).json({
      success: true,
      count: schoolYears.length,
      data: schoolYears,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch school years.",
    });
  }
};

// READ - Get active school year
const findActiveSchoolYear = async (req, res) => {
  try {
    const activeSchoolYear = await schoolYearService.findActiveSchoolYear();

    if (!activeSchoolYear) {
      return res.status(404).json({
        success: false,
        message: "No active school year set.",
      });
    }

    return res.status(200).json({
      success: true,
      data: activeSchoolYear,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve active school year.",
    });
  }
};

// READ - Get school year by ID
const findSchoolYearById = async (req, res) => {
  try {
    const { id } = req.params;

    const schoolYear = await schoolYearService.findSchoolYearById(id);

    if (!schoolYear) {
      return res.status(404).json({
        success: false,
        message: "School year not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: schoolYear,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve school year.",
    });
  }
};

// READ - Get school year by year string (e.g. "2025-2026")
const findSchoolYearByYear = async (req, res) => {
  try {
    const { school_year } = req.params;

    const record = await schoolYearService.findSchoolYearByYear(school_year);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "School year not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve school year.",
    });
  }
};

// UPDATE - Update school year by ID
const updateSchoolYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_id, school_year, start_date, end_date, is_active } = req.body;

    const result = await schoolYearService.updateSchoolYear(id, staff_id, school_year, start_date, end_date, is_active);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "School year not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School year updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update school year.",
    });
  }
};

// DELETE - Delete school year by ID
const deleteSchoolYear = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await schoolYearService.deleteSchoolYear(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "School year not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "School year deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete school year.",
    });
  }
};

module.exports = {
  createSchoolYear,
  findAllSchoolYears,
  findActiveSchoolYear,
  findSchoolYearById,
  findSchoolYearByYear,
  updateSchoolYear,
  deleteSchoolYear,
};
