const staffService = require("../services/staff-service.js");

// CREATE - Register new staff
const createStaff = async (req, res) => {
  try {
    const { account_id, role_id, lastname, firstname, contact_no, email } = req.body;

    const result = await staffService.createStaff(account_id, role_id, lastname, firstname, contact_no, email);

    return res.status(201).json({
      success: true,
      message: "Staff member created successfully.",
      data: {
        id: result.insertId,
        account_id,
        role_id,
        lastname,
        firstname,
        contact_no,
        email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create staff record.",
    });
  }
};

// READ - Get all staff
const findAllStaffs = async (req, res) => {
  try {
    const staffs = await staffService.findAllStaffs();

    return res.status(200).json({
      success: true,
      count: staffs.length,
      data: staffs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch staff records.",
    });
  }
};

// READ - Get staff by ID
const findStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await staffService.findStaffById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve staff record.",
    });
  }
};

// READ - Get staff by account ID
const findStaffByAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const staff = await staffService.findStaffByAccountId(account_id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff record not found for this account.",
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve staff record.",
    });
  }
};

// READ - Get staff by email
const findStaffByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const staff = await staffService.findStaffByEmail(email);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff record not found for this email.",
      });
    }

    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to retrieve staff record.",
    });
  }
};

// UPDATE - Update staff by ID
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_id, role_id, lastname, firstname, contact_no, email } = req.body;

    const result = await staffService.updateStaff(id, account_id, role_id, lastname, firstname, contact_no, email);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff record not found or no changes made.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff record updated successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update staff record.",
    });
  }
};

// DELETE - Delete staff by ID
const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await staffService.deleteStaff(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Staff record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Staff record deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete staff record.",
    });
  }
};

module.exports = {
  createStaff,
  findAllStaffs,
  findStaffById,
  findStaffByAccountId,
  findStaffByEmail,
  updateStaff,
  deleteStaff,
};
